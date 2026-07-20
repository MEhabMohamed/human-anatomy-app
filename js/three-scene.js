/**
 * Human Anatomy App - Three.js Visual Scene Controller
 * Manages rendering, interaction, camera transitions, raycasting, and explode views.
 */

class AnatomyScene {
  constructor(canvasContainerId, onPartClicked, onPartHovered) {
    this.container = document.getElementById(canvasContainerId);
    this.onPartClicked = onPartClicked;
    this.onPartHovered = onPartHovered;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    
    // Groups for systems
    this.systemsGroups = {};
    this.bodyOutlineGroup = null;
    
    // Interaction state
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredMesh = null;
    this.selectedPartId = null;
    this.gender = 'male'; // default
    
    // Camera animation targets
    this.cameraTargetLookAt = new THREE.Vector3(0, 0, 0);
    this.cameraTargetPos = new THREE.Vector3(0, 0, 3.5);
    this.cameraAnimating = true;
    this.zoomBaseDist = 2.5;

    // Explode view factor
    this.explodeFactor = 0.0;
    this.targetExplodeFactor = 0.0;

    this.init();
    this.animate();
  }

  init() {
    // 1. Setup Scene & Renderer
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent to allow CSS gradients

    // 2. Setup Camera
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 50);
    this.camera.position.copy(this.cameraTargetPos);

    // 3. Setup Renderer with antialiasing and alpha (transparent)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // 4. Setup Orbit Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.3; // Allow looking slightly upward from bottom
    this.controls.minDistance = 0.4;
    this.controls.maxDistance = 8.0;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 10, 7);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.6); // Soft blue rim light
    dirLight2.position.set(-5, 3, -5);
    this.scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x6366f1, 1.2, 5);
    pointLight.position.set(0, 0.5, 0.8);
    this.scene.add(pointLight);

    // Initialize materials
    ANATOMY_BUILDER.initMaterials();

    // 6. Build initial model
    this.buildHumanModel();

    // 7. Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.domElement.addEventListener('pointermove', this.onPointerMove.bind(this));
    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown.bind(this));

    // Handle touch/click start tracking to distinguish drag vs click
    this.pointerDownTime = 0;
    this.pointerDownPos = new THREE.Vector2();
  }

  /**
   * Build/Rebuild human anatomy systems
   */
  buildHumanModel() {
    // Clear old elements if any
    if (this.bodyOutlineGroup) this.scene.remove(this.bodyOutlineGroup);
    for (const key in this.systemsGroups) {
      this.scene.remove(this.systemsGroups[key]);
    }
    this.systemsGroups = {};

    // 1. Silhouette outline
    this.bodyOutlineGroup = ANATOMY_BUILDER.buildBodyOutline(this.gender);
    this.scene.add(this.bodyOutlineGroup);

    // 2. Skeletal System
    this.systemsGroups.skeletal = ANATOMY_BUILDER.buildSkeletal(this.gender);
    this.scene.add(this.systemsGroups.skeletal);

    // 3. Visceral/Digestive
    this.systemsGroups.digestive = ANATOMY_BUILDER.buildVisceral(this.gender);
    this.scene.add(this.systemsGroups.digestive);

    // 4. Nervous
    this.systemsGroups.nervous = ANATOMY_BUILDER.buildNervous();
    this.scene.add(this.systemsGroups.nervous);

    // 5. Cardiovascular
    this.systemsGroups.cardiovascular = ANATOMY_BUILDER.buildCardiovascular();
    this.scene.add(this.systemsGroups.cardiovascular);

    // 6. Reproductive
    this.systemsGroups.reproductive = ANATOMY_BUILDER.buildReproductive(this.gender);
    this.scene.add(this.systemsGroups.reproductive);

    // 7. Skin
    this.systemsGroups.skin = ANATOMY_BUILDER.buildSkin(this.gender);
    this.scene.add(this.systemsGroups.skin);

    // 8. Blood
    this.systemsGroups.blood = ANATOMY_BUILDER.buildBlood();
    this.scene.add(this.systemsGroups.blood);

    // Apply current visibility and explode factor to new model
    this.updateExplodePositions();
  }

  /**
   * Toggle gender
   */
  setGender(gender) {
    if (this.gender === gender) return;
    this.gender = gender;
    this.buildHumanModel();
  }

  /**
   * Toggle system visibility
   */
  toggleSystemVisibility(systemId, isVisible) {
    const group = this.systemsGroups[systemId];
    if (group) {
      group.visible = isVisible;
    }
    // Clean up hover states if visible becomes false
    if (!isVisible && this.hoveredMesh && this.hoveredMesh.userData.systemId === systemId) {
      this.clearHover();
    }
  }

  /**
   * Set Explode view slider factor (0.0 to 1.0)
   */
  setExplodeFactor(val) {
    this.targetExplodeFactor = val;
  }

  /**
   * Perform translations for explode view
   */
  updateExplodePositions() {
    const factor = this.explodeFactor;
    
    // Traverse all meshes in the systems and offset them along their explode direction
    for (const sysId in this.systemsGroups) {
      const group = this.systemsGroups[sysId];
      group.traverse(child => {
        if (child.isMesh && child.userData.explodeDir) {
          const original = child.userData.originalPos;
          const dir = child.userData.explodeDir;
          
          child.position.copy(original).addScaledVector(dir, factor);
        } else if (child.isGroup && child.userData.explodeDir && child !== group) {
          // Some structures are nested groups
          const original = child.userData.originalPos;
          const dir = child.userData.explodeDir;
          child.position.copy(original).addScaledVector(dir, factor);
        }
      });
    }
  }

  /**
   * Zoom camera to focus on coordinate metrics
   */
  focusOnPart(partId) {
    this.selectedPartId = partId;
    
    if (!partId) {
      // Reset camera
      this.cameraTargetLookAt.set(0, 0, 0);
      this.cameraTargetPos.set(0, 0, 3.5);
      this.cameraAnimating = true;
      this.clearHover();
      return;
    }

    const item = window.ANATOMY_DATABASE.flatDatabase[partId];
    if (!item || !item.coords) return;

    const { x, y, z, zoom } = item.coords;
    const dist = zoom * this.zoomBaseDist;

    // Center camera on coordinate
    this.cameraTargetLookAt.set(x, y, z);
    
    // Position camera at perspective offset
    this.cameraTargetPos.set(
      x + dist * 0.15,
      y + dist * 0.1,
      z + dist
    );
    this.cameraAnimating = true;
  }

  /**
   * Reset view to full body scale
   */
  resetView() {
    this.focusOnPart(null);
  }

  /**
   * Get all interactive meshes in the active/visible scene
   */
  getInteractiveObjects() {
    const list = [];
    for (const sysId in this.systemsGroups) {
      const group = this.systemsGroups[sysId];
      if (group.visible) {
        group.traverse(child => {
          if (child.isMesh && child.userData.partId) {
            list.push(child);
          }
        });
      }
    }
    return list;
  }

  /**
   * Pointer interaction - hover detection
   */
  onPointerMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.getInteractiveObjects());

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      
      if (this.hoveredMesh !== hitMesh) {
        this.clearHover();
        this.hoveredMesh = hitMesh;

        // Save original material if not already saved
        if (!this.hoveredMesh.userData.originalMaterial) {
          this.hoveredMesh.userData.originalMaterial = this.hoveredMesh.material;
        }

        // Apply hover highlight
        this.hoveredMesh.material = ANATOMY_BUILDER.materials.skeletalSelected;
        
        // Trigger hover callback
        if (this.onPartHovered) {
          this.onPartHovered(hitMesh.userData.partId);
        }
      }
      document.body.style.cursor = 'pointer';
    } else {
      if (this.hoveredMesh) {
        this.clearHover();
      }
      document.body.style.cursor = 'default';
    }
  }

  clearHover() {
    if (this.hoveredMesh) {
      if (this.hoveredMesh.userData.originalMaterial) {
        this.hoveredMesh.material = this.hoveredMesh.userData.originalMaterial;
      }
      this.hoveredMesh = null;
      if (this.onPartHovered) {
        this.onPartHovered(null);
      }
    }
  }

  /**
   * Pointer down tracking
   */
  onPointerDown(event) {
    this.pointerDownTime = performance.now();
    this.pointerDownPos.set(event.clientX, event.clientY);
    
    // Add temporary event listener for up
    const onUp = (e) => {
      this.renderer.domElement.removeEventListener('pointerup', onUp);
      
      const duration = performance.now() - this.pointerDownTime;
      const dist = this.pointerDownPos.distanceTo(new THREE.Vector2(e.clientX, e.clientY));
      
      // If pointer didn't move much and release was quick, count as a click (not a drag/orbit)
      if (duration < 250 && dist < 5) {
        this.onPointerClick(e);
      }
    };
    
    this.renderer.domElement.addEventListener('pointerup', onUp);
  }

  /**
   * Pointer interaction - select click
   */
  onPointerClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.getInteractiveObjects());

    if (intersects.length > 0) {
      const partId = intersects[0].object.userData.partId;
      if (this.onPartClicked) {
        this.onPartClicked(partId);
      }
    }
  }

  onWindowResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Animation & Render Loop
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = performance.now() * 0.001;

    // 1. Pulse animations for Visceral/Cardio (Heartbeat simulation)
    const heartMesh = this.scene.getObjectByName('myocardium');
    if (heartMesh) {
      // Simulated heartbeat scale modulation
      const pulse = 1.0 + Math.sin(time * 5.0) * 0.05 * (Math.sin(time * 2.5) > 0 ? 1 : 0.2);
      heartMesh.scale.set(0.8 * pulse, 1.2 * pulse, 0.9 * pulse);
    }

    // 2. Pulse emissive brightness for nervous system (pulsing synapses)
    if (ANATOMY_BUILDER.materials.nervousLine) {
      const glow = 0.35 + Math.sin(time * 4.0) * 0.15;
      ANATOMY_BUILDER.materials.nervousLine.opacity = glow;
    }

    // 3. Interpolate explode view slider positions
    if (Math.abs(this.explodeFactor - this.targetExplodeFactor) > 0.001) {
      this.explodeFactor += (this.targetExplodeFactor - this.explodeFactor) * 0.1;
      this.updateExplodePositions();
    }

    // 4. Smooth camera animations
    if (this.cameraAnimating) {
      this.camera.position.lerp(this.cameraTargetPos, 0.06);
      this.controls.target.lerp(this.cameraTargetLookAt, 0.06);
      
      // Stop animating when camera is extremely close to target vectors
      if (this.camera.position.distanceTo(this.cameraTargetPos) < 0.005 &&
          this.controls.target.distanceTo(this.cameraTargetLookAt) < 0.005) {
        this.cameraAnimating = false;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnatomyScene;
} else {
  window.AnatomyScene = AnatomyScene;
}
