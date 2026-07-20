/**
 * Human Anatomy App - 3D Geometry Builder
 * Programmatically constructs stylized 3D meshes for anatomy parts.
 */

const ANATOMY_BUILDER = {
  // Common materials with premium neon glow aesthetics
  materials: {},

  initMaterials() {
    this.materials = {
      // Glow/hologram silhouette
      silhouette: new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
      silhouetteOutline: new THREE.LineBasicMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
      }),
      
      // Skeletal system - ivory white, slight specular glow
      skeletal: new THREE.MeshPhongMaterial({
        color: 0xe2e8f0,
        emissive: 0x1e293b,
        specular: 0xffffff,
        shininess: 30,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      }),
      skeletalSelected: new THREE.MeshPhongMaterial({
        color: 0xfef08a,
        emissive: 0x854d0e,
        specular: 0xffffff,
        shininess: 50,
        transparent: true,
        opacity: 0.95
      }),

      // Cardiovascular system
      artery: new THREE.MeshPhongMaterial({
        color: 0xef4444,
        emissive: 0x7f1d1d,
        transparent: true,
        opacity: 0.8,
        shininess: 40
      }),
      vein: new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        emissive: 0x1e3a8a,
        transparent: true,
        opacity: 0.8,
        shininess: 40
      }),
      heart: new THREE.MeshPhongMaterial({
        color: 0xfca5a5,
        emissive: 0x991b1b,
        specular: 0xffffff,
        shininess: 60,
        transparent: true,
        opacity: 0.9
      }),

      // Nervous system
      nervous: new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      }),
      nervousLine: new THREE.LineBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      }),

      // Digestive & Visceral Organs - warm amber/gold hues
      lung: new THREE.MeshPhongMaterial({
        color: 0xfbbf24,
        emissive: 0x78350f,
        specular: 0xffffff,
        shininess: 20,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      }),
      stomach: new THREE.MeshPhongMaterial({
        color: 0xf59e0b,
        emissive: 0x78350f,
        shininess: 30,
        transparent: true,
        opacity: 0.85
      }),
      liver: new THREE.MeshPhongMaterial({
        color: 0xd97706,
        emissive: 0x78350f,
        shininess: 15,
        transparent: true,
        opacity: 0.85
      }),
      intestines: new THREE.MeshPhongMaterial({
        color: 0xb45309,
        emissive: 0x451a03,
        shininess: 10,
        transparent: true,
        opacity: 0.85
      }),
      kidney: new THREE.MeshPhongMaterial({
        color: 0x92400e,
        emissive: 0x451a03,
        shininess: 25,
        transparent: true,
        opacity: 0.85
      }),
      
      // Reproductive
      reproductive: new THREE.MeshPhongMaterial({
        color: 0xec4899,
        emissive: 0x831843,
        shininess: 40,
        transparent: true,
        opacity: 0.8
      }),
      // Skin System - concentric shell glow materials
      epidermis: new THREE.MeshPhongMaterial({
        color: 0xfdba74,
        emissive: 0x7c2d12,
        specular: 0xffffff,
        shininess: 30,
        transparent: true,
        opacity: 0.20,
        side: THREE.DoubleSide,
        depthWrite: false
      }),
      dermis: new THREE.MeshPhongMaterial({
        color: 0xf97316,
        emissive: 0x431407,
        specular: 0xffffff,
        shininess: 20,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false
      }),
      subcutaneous: new THREE.MeshPhongMaterial({
        color: 0xeab308,
        emissive: 0x451a03,
        specular: 0xffffff,
        shininess: 10,
        transparent: true,
        opacity: 0.10,
        side: THREE.DoubleSide,
        depthWrite: false
      }),

      // Blood System - cellular materials
      rbc: new THREE.MeshPhongMaterial({
        color: 0xf43f5e,
        emissive: 0x881337,
        shininess: 60,
        transparent: true,
        opacity: 0.9,
        specular: 0xffffff
      }),
      wbc: new THREE.MeshPhongMaterial({
        color: 0xf8fafc,
        emissive: 0x475569,
        shininess: 20,
        transparent: true,
        opacity: 0.85
      }),
      platelet: new THREE.MeshPhongMaterial({
        color: 0xc084fc,
        emissive: 0x581c87,
        shininess: 40,
        transparent: true,
        opacity: 0.85
      })
    };
  },

  /**
   * Helper to set metadata on meshes to link back to database
   */
  tagMesh(mesh, partId, systemId, explodeDir = new THREE.Vector3(0, 0, 0)) {
    mesh.name = partId;
    mesh.userData = {
      partId: partId,
      systemId: systemId,
      explodeDir: explodeDir,
      originalPos: mesh.position.clone()
    };
    return mesh;
  },

  /**
   * Create the Human Outline Contour Mesh (Male/Female shape differences)
   */
  buildBodyOutline(gender) {
    const group = new THREE.Group();
    const meshGeom = this.createBodyGeometry(gender, 1.0);
    const silhouetteMesh = new THREE.Mesh(meshGeom, this.materials.silhouette);
    group.add(silhouetteMesh);

    // Create longitudinal lines to accentuate contours
    const isFemale = gender === 'female';
    const contours = [
      { y: 1.8, rx: 0.18, rz: 0.18 },
      { y: 1.6, rx: 0.22, rz: 0.22 },
      { y: 1.4, rx: 0.18, rz: 0.16 },
      { y: 1.25, rx: 0.12, rz: 0.12 },
      { y: 1.0, rx: 0.32, rz: isFemale ? 0.44 : 0.52 },
      { y: 0.6, rx: 0.30, rz: isFemale ? 0.38 : 0.45 },
      { y: 0.2, rx: 0.26, rz: isFemale ? 0.28 : 0.36 },
      { y: -0.2, rx: 0.30, rz: isFemale ? 0.34 : 0.36 },
      { y: -0.6, rx: 0.34, rz: isFemale ? 0.46 : 0.42 },
      { y: -1.0, rx: 0.22, rz: 0.36 },
      { y: -1.5, rx: 0.18, rz: 0.28 },
      { y: -1.9, rx: 0.13, rz: 0.16 },
      { y: -2.3, rx: 0.12, rz: 0.16 },
      { y: -2.7, rx: 0.08, rz: 0.10 }
    ];
    const segments = 32;
    for (let j = 0; j < segments; j += 4) {
      const linePoints = [];
      for (let i = 0; i < contours.length; i++) {
        const c = contours[i];
        const theta = (j / segments) * Math.PI * 2;
        linePoints.push(new THREE.Vector3(Math.sin(theta) * c.rz, c.y, Math.cos(theta) * c.rx));
      }
      const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
      const line = new THREE.Line(lineGeom, this.materials.silhouetteOutline);
      group.add(line);
    }

    return group;
  },

  /**
   * Skeletal System Construction
   */
  buildSkeletal(gender) {
    const group = new THREE.Group();
    const isFemale = gender === 'female';

    // 1. SKULL
    const skullGroup = new THREE.Group();
    skullGroup.position.set(0, 1.6, 0.02);
    
    // Cranium
    const craniumGeom = new THREE.SphereGeometry(0.18, 16, 16);
    craniumGeom.scale(1, 1.1, 1.1);
    const craniumMesh = new THREE.Mesh(craniumGeom, this.materials.skeletal);
    this.tagMesh(craniumMesh, 'cranium', 'skeletal', new THREE.Vector3(0, 0.5, 0.2));
    skullGroup.add(craniumMesh);

    // Mandible
    const mandibleGeom = new THREE.BoxGeometry(0.16, 0.08, 0.16);
    mandibleGeom.translate(0, -0.12, 0.06);
    const mandibleMesh = new THREE.Mesh(mandibleGeom, this.materials.skeletal);
    this.tagMesh(mandibleMesh, 'mandible', 'skeletal', new THREE.Vector3(0, 0.2, 0.3));
    skullGroup.add(mandibleMesh);
    
    this.tagMesh(skullGroup, 'skull', 'skeletal', new THREE.Vector3(0, 0.5, 0.1));
    group.add(skullGroup);

    // 2. SPINE (Cervical, Thoracic, Lumbar, Sacrum)
    const spineGroup = new THREE.Group();
    const spineVertebrae = [
      { id: 'cervical', yStart: 1.3, yEnd: 1.1, count: 7, size: 0.05, exp: new THREE.Vector3(0, 0.1, -0.2) },
      { id: 'thoracic', yStart: 1.1, yEnd: 0.5, count: 12, size: 0.07, exp: new THREE.Vector3(0, 0, -0.2) },
      { id: 'lumbar', yStart: 0.5, yEnd: -0.2, count: 5, size: 0.09, exp: new THREE.Vector3(0, -0.1, -0.2) },
      { id: 'sacrum', yStart: -0.2, yEnd: -0.6, count: 4, size: 0.1, exp: new THREE.Vector3(0, -0.2, -0.2) }
    ];

    spineVertebrae.forEach(sec => {
      const secGroup = new THREE.Group();
      const step = (sec.yStart - sec.yEnd) / sec.count;
      
      for (let i = 0; i < sec.count; i++) {
        const y = sec.yStart - (i * step);
        // Vertebra body
        const discGeom = new THREE.CylinderGeometry(sec.size * 0.7, sec.size * 0.7, 0.02, 12);
        discGeom.scale(1.2, 1, 1);
        const disc = new THREE.Mesh(discGeom, this.materials.skeletal);
        disc.position.set(0, y, -0.08);
        secGroup.add(disc);
      }

      this.tagMesh(secGroup, sec.id, 'skeletal', sec.exp);
      spineGroup.add(secGroup);
    });

    this.tagMesh(spineGroup, 'spine', 'skeletal', new THREE.Vector3(0, 0, -0.15));
    group.add(spineGroup);

    // 3. RIBCAGE & STERNUM
    const ribcageGroup = new THREE.Group();
    ribcageGroup.position.set(0, 0.5, 0.02);

    // Sternum
    const sternumGeom = new THREE.BoxGeometry(0.04, 0.4, 0.02);
    const sternumMesh = new THREE.Mesh(sternumGeom, this.materials.skeletal);
    sternumMesh.position.set(0, 0.2, 0.16);
    this.tagMesh(sternumMesh, 'sternum', 'skeletal', new THREE.Vector3(0, 0.1, 0.3));
    ribcageGroup.add(sternumMesh);

    // Ribs (10 pairs modeled programmatically)
    const ribsSubGroup = new THREE.Group();
    const ribPairCount = 10;
    for (let i = 0; i < ribPairCount; i++) {
      const y = 0.45 - (i * 0.06);
      const width = 0.2 + (i * 0.015) - (i > 7 ? (i - 7) * 0.05 : 0);
      const height = 0.08 + (i * 0.005);
      
      // Rib curve (Toruses sliced/scaled or tube)
      const leftRibGeom = new THREE.TorusGeometry(width, 0.01, 8, 16, Math.PI);
      leftRibGeom.scale(1.1, 0.4, 0.8);
      const leftRib = new THREE.Mesh(leftRibGeom, this.materials.skeletal);
      leftRib.rotation.x = Math.PI / 2;
      leftRib.rotation.y = -Math.PI / 8;
      leftRib.position.set(-width * 0.45, y, 0);
      
      const rightRib = leftRib.clone();
      rightRib.rotation.y = Math.PI / 8;
      rightRib.position.x = width * 0.45;

      ribsSubGroup.add(leftRib);
      ribsSubGroup.add(rightRib);
    }
    this.tagMesh(ribsSubGroup, 'ribs', 'skeletal', new THREE.Vector3(0, 0.1, 0.25));
    ribcageGroup.add(ribsSubGroup);

    this.tagMesh(ribcageGroup, 'ribcage', 'skeletal', new THREE.Vector3(0, 0.15, 0.2));
    group.add(ribcageGroup);

    // 4. PELVIS
    const pelvisWidth = isFemale ? 0.38 : 0.30;
    const pelvisGeom = new THREE.TorusGeometry(pelvisWidth * 0.6, 0.04, 8, 24, Math.PI * 1.2);
    pelvisGeom.scale(1.3, 0.6, 1.2);
    const pelvisMesh = new THREE.Mesh(pelvisGeom, this.materials.skeletal);
    pelvisMesh.rotation.x = Math.PI / 2 + 0.2;
    pelvisMesh.position.set(0, -0.6, -0.02);
    this.tagMesh(pelvisMesh, 'pelvis', 'skeletal', new THREE.Vector3(0, -0.2, 0.1));
    group.add(pelvisMesh);

    // 5. LIMBS
    const limbsGroup = new THREE.Group();
    
    // Humerus (Arms)
    const armX = 0.35;
    const leftHumerusGeom = new THREE.CylinderGeometry(0.022, 0.018, 0.45, 8);
    const leftHumerus = new THREE.Mesh(leftHumerusGeom, this.materials.skeletal);
    leftHumerus.position.set(-armX, 0.78, 0);
    leftHumerus.rotation.z = Math.PI / 18;
    this.tagMesh(leftHumerus, 'humerus', 'skeletal', new THREE.Vector3(-0.3, 0.1, 0));
    limbsGroup.add(leftHumerus);

    const rightHumerus = leftHumerus.clone();
    rightHumerus.position.x = armX;
    rightHumerus.rotation.z = -Math.PI / 18;
    this.tagMesh(rightHumerus, 'humerus', 'skeletal', new THREE.Vector3(0.3, 0.1, 0));
    limbsGroup.add(rightHumerus);

    // Radius/Ulna (Forearm)
    const leftRadUlnaGeom = new THREE.CylinderGeometry(0.016, 0.012, 0.4, 8);
    const leftRadUlna = new THREE.Mesh(leftRadUlnaGeom, this.materials.skeletal);
    leftRadUlna.position.set(-armX - 0.05, 0.38, 0.02);
    leftRadUlna.rotation.z = Math.PI / 12;
    this.tagMesh(leftRadUlna, 'radius_ulna', 'skeletal', new THREE.Vector3(-0.4, 0, 0.1));
    limbsGroup.add(leftRadUlna);

    const rightRadUlna = leftRadUlna.clone();
    rightRadUlna.position.x = armX + 0.05;
    rightRadUlna.rotation.z = -Math.PI / 12;
    this.tagMesh(rightRadUlna, 'radius_ulna', 'skeletal', new THREE.Vector3(0.4, 0, 0.1));
    limbsGroup.add(rightRadUlna);

    // Femurs (Thighs)
    const legX = isFemale ? 0.16 : 0.13;
    const leftFemurGeom = new THREE.CylinderGeometry(0.038, 0.032, 0.7, 8);
    const leftFemur = new THREE.Mesh(leftFemurGeom, this.materials.skeletal);
    leftFemur.position.set(-legX, -1.0, 0);
    leftFemur.rotation.z = isFemale ? Math.PI / 30 : Math.PI / 45; // Female hips slope inward more
    this.tagMesh(leftFemur, 'femur', 'skeletal', new THREE.Vector3(-0.25, -0.2, 0));
    limbsGroup.add(leftFemur);

    const rightFemur = leftFemur.clone();
    rightFemur.position.x = legX;
    rightFemur.rotation.z = isFemale ? -Math.PI / 30 : -Math.PI / 45;
    this.tagMesh(rightFemur, 'femur', 'skeletal', new THREE.Vector3(0.25, -0.2, 0));
    limbsGroup.add(rightFemur);

    // Tibia/Fibula (Shin)
    const leftTibFibGeom = new THREE.CylinderGeometry(0.028, 0.02, 0.7, 8);
    const leftTibFib = new THREE.Mesh(leftTibFibGeom, this.materials.skeletal);
    leftTibFib.position.set(-legX, -1.75, 0);
    this.tagMesh(leftTibFib, 'tibia_fibula', 'skeletal', new THREE.Vector3(-0.2, -0.3, 0));
    limbsGroup.add(leftTibFib);

    const rightTibFib = leftTibFib.clone();
    rightTibFib.position.x = legX;
    this.tagMesh(rightTibFib, 'tibia_fibula', 'skeletal', new THREE.Vector3(0.2, -0.3, 0));
    limbsGroup.add(rightTibFib);

    this.tagMesh(limbsGroup, 'limbs', 'skeletal', new THREE.Vector3(0, -0.2, 0));
    group.add(limbsGroup);

    return group;
  },

  /**
   * Visceral Organs Construction (Lungs, Heart, Stomach, Liver, Kidneys, Intestines)
   */
  buildVisceral(gender) {
    const group = new THREE.Group();

    // 1. HEART
    const heartGroup = new THREE.Group();
    heartGroup.position.set(-0.04, 0.55, 0.08);

    // Core muscle mass
    const heartMuscleGeom = new THREE.SphereGeometry(0.09, 16, 16);
    heartMuscleGeom.scale(0.8, 1.2, 0.9);
    const heartMuscle = new THREE.Mesh(heartMuscleGeom, this.materials.heart);
    this.tagMesh(heartMuscle, 'myocardium', 'digestive', new THREE.Vector3(-0.1, 0.15, 0.25));
    heartGroup.add(heartMuscle);

    // Aorta (curved tube at top)
    const aortaPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.08, 0),
      new THREE.Vector3(0.02, 0.15, 0.02),
      new THREE.Vector3(-0.01, 0.18, -0.04),
      new THREE.Vector3(-0.03, 0.05, -0.06)
    ]);
    const aortaGeom = new THREE.TubeGeometry(aortaPath, 12, 0.022, 8, false);
    const aortaMesh = new THREE.Mesh(aortaGeom, this.materials.artery);
    this.tagMesh(aortaMesh, 'aorta', 'digestive', new THREE.Vector3(-0.08, 0.2, 0.2));
    heartGroup.add(aortaMesh);

    // Vena Cava
    const vcPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.04, -0.15, -0.02),
      new THREE.Vector3(0.04, 0.15, -0.02)
    ]);
    const vcGeom = new THREE.TubeGeometry(vcPath, 8, 0.018, 8, false);
    const vcMesh = new THREE.Mesh(vcGeom, this.materials.vein);
    this.tagMesh(vcMesh, 'vena_cava', 'digestive', new THREE.Vector3(0.02, 0.15, 0.15));
    heartGroup.add(vcMesh);

    this.tagMesh(heartGroup, 'heart', 'digestive', new THREE.Vector3(-0.1, 0.1, 0.25));
    group.add(heartGroup);

    // 2. LUNGS
    const lungsGroup = new THREE.Group();
    lungsGroup.position.set(0, 0.52, 0.04);

    // Left Lung
    const leftLungGeom = new THREE.SphereGeometry(0.12, 16, 16);
    leftLungGeom.scale(0.85, 1.8, 1.1);
    // Flatten inner side slightly to simulate cardiac notch
    const leftV = leftLungGeom.attributes.position;
    for (let i = 0; i < leftV.count; i++) {
      if (leftV.getX(i) > 0) {
        leftV.setX(i, leftV.getX(i) * 0.7); // compress inner wall
      }
    }
    leftLungGeom.computeVertexNormals();
    const leftLungMesh = new THREE.Mesh(leftLungGeom, this.materials.lung);
    leftLungMesh.position.set(-0.15, 0, 0);
    leftLungMesh.rotation.y = Math.PI / 12;
    this.tagMesh(leftLungMesh, 'left_lung', 'digestive', new THREE.Vector3(-0.25, 0.1, 0.15));
    lungsGroup.add(leftLungMesh);

    // Right Lung (no cardiac notch, slightly wider)
    const rightLungGeom = new THREE.SphereGeometry(0.13, 16, 16);
    rightLungGeom.scale(0.95, 1.8, 1.1);
    const rightLungMesh = new THREE.Mesh(rightLungGeom, this.materials.lung);
    rightLungMesh.position.set(0.15, 0, 0);
    rightLungMesh.rotation.y = -Math.PI / 12;
    this.tagMesh(rightLungMesh, 'right_lung', 'digestive', new THREE.Vector3(0.25, 0.1, 0.15));
    lungsGroup.add(rightLungMesh);

    this.tagMesh(lungsGroup, 'lungs', 'digestive', new THREE.Vector3(0, 0.1, 0.2));
    group.add(lungsGroup);

    // 3. LIVER
    const liverGeom = new THREE.ConeGeometry(0.22, 0.18, 4);
    liverGeom.rotateX(-Math.PI / 3);
    liverGeom.rotateY(Math.PI / 4);
    liverGeom.scale(1.2, 0.7, 0.85);
    const liverMesh = new THREE.Mesh(liverGeom, this.materials.liver);
    liverMesh.position.set(0.11, 0.18, 0.06);
    this.tagMesh(liverMesh, 'liver', 'digestive', new THREE.Vector3(0.25, -0.05, 0.15));
    group.add(liverMesh);

    // 4. STOMACH
    const stomachGroup = new THREE.Group();
    stomachGroup.position.set(-0.1, 0.15, 0.08);

    // Custom shape using spheres scaled/skewed
    const stomachMainGeom = new THREE.SphereGeometry(0.12, 16, 16);
    stomachMainGeom.scale(1.3, 0.7, 0.9);
    // Skew vertices to make it J-shaped
    const sPos = stomachMainGeom.attributes.position;
    for (let i = 0; i < sPos.count; i++) {
      const x = sPos.getX(i);
      const y = sPos.getY(i);
      sPos.setY(i, y - (x * x * 0.5)); // curve down on the sides
    }
    stomachMainGeom.computeVertexNormals();

    const stomachMain = new THREE.Mesh(stomachMainGeom, this.materials.stomach);
    stomachMain.rotation.z = -Math.PI / 8;
    this.tagMesh(stomachMain, 'stomach', 'digestive', new THREE.Vector3(-0.25, -0.05, 0.15));
    stomachGroup.add(stomachMain);

    this.tagMesh(stomachGroup, 'stomach', 'digestive', new THREE.Vector3(-0.2, -0.05, 0.15));
    group.add(stomachGroup);

    // 5. INTESTINES (Winding tube small, border loop large)
    const intestinesGroup = new THREE.Group();
    intestinesGroup.position.set(0, -0.22, 0.05);

    // Small intestine - procedural dense winding path
    const siPoints = [];
    const loopRadius = 0.08;
    for (let i = 0; i < 60; i++) {
      const theta = i * 0.8;
      const x = Math.sin(theta) * loopRadius * (1 + Math.sin(i * 0.05) * 0.3) + (Math.sin(i * 0.25) * 0.03);
      const y = 0.08 - (i * 0.005);
      const z = Math.cos(theta) * loopRadius * 0.7 + (Math.cos(i * 0.2) * 0.02);
      siPoints.push(new THREE.Vector3(x, y, z));
    }
    const siPath = new THREE.CatmullRomCurve3(siPoints);
    const siGeom = new THREE.TubeGeometry(siPath, 80, 0.015, 6, false);
    const siMesh = new THREE.Mesh(siGeom, this.materials.intestines);
    this.tagMesh(siMesh, 'small_intestine', 'digestive', new THREE.Vector3(0, -0.2, 0.2));
    intestinesGroup.add(siMesh);

    // Large intestine - loops around the small intestine
    const liPoints = [
      new THREE.Vector3(0.12, -0.16, 0.03), // Cecum (lower right)
      new THREE.Vector3(0.13, 0.12, 0.03),  // Ascending colon
      new THREE.Vector3(0.08, 0.15, 0.05),  // Hepatic flexure
      new THREE.Vector3(-0.08, 0.15, 0.05), // Transverse colon
      new THREE.Vector3(-0.13, 0.12, 0.03), // Splenic flexure
      new THREE.Vector3(-0.12, -0.16, 0.03),// Descending colon
      new THREE.Vector3(-0.05, -0.20, 0.01),// Sigmoid colon
      new THREE.Vector3(0.0, -0.22, -0.03)  // Rectum
    ];
    const liPath = new THREE.CatmullRomCurve3(liPoints);
    const liGeom = new THREE.TubeGeometry(liPath, 32, 0.028, 8, false);
    const liMesh = new THREE.Mesh(liGeom, this.materials.intestines);
    this.tagMesh(liMesh, 'large_intestine', 'digestive', new THREE.Vector3(0, -0.18, 0.22));
    intestinesGroup.add(liMesh);

    this.tagMesh(intestinesGroup, 'intestines', 'digestive', new THREE.Vector3(0, -0.2, 0.2));
    group.add(intestinesGroup);

    // 6. KIDNEYS (Posterior)
    const kidneysGroup = new THREE.Group();
    kidneysGroup.position.set(0, 0.05, -0.1);

    // Left kidney
    const leftKidneyGeom = new THREE.SphereGeometry(0.05, 12, 12);
    leftKidneyGeom.scale(0.6, 1, 0.5);
    const leftKidney = new THREE.Mesh(leftKidneyGeom, this.materials.kidney);
    leftKidney.position.set(-0.12, 0, 0);
    leftKidney.rotation.z = -Math.PI / 12;
    this.tagMesh(leftKidney, 'kidneys', 'digestive', new THREE.Vector3(-0.2, 0, -0.3));
    kidneysGroup.add(leftKidney);

    // Right kidney (slightly lower due to liver)
    const rightKidney = leftKidney.clone();
    rightKidney.position.set(0.12, -0.03, 0);
    rightKidney.rotation.z = Math.PI / 12;
    this.tagMesh(rightKidney, 'kidneys', 'digestive', new THREE.Vector3(0.2, -0.03, -0.3));
    kidneysGroup.add(rightKidney);

    this.tagMesh(kidneysGroup, 'kidneys', 'digestive', new THREE.Vector3(0, -0.05, -0.25));
    group.add(kidneysGroup);

    return group;
  },

  /**
   * Cardiovascular System Construction (Aorta, Major Arteries & Veins)
   */
  buildCardiovascular() {
    const group = new THREE.Group();

    // Red Arteries branching system
    const arteryGroup = new THREE.Group();
    
    // Main Aortic Descent line down the spine
    const aortaDescentPoints = [
      new THREE.Vector3(-0.02, 0.50, 0.02),
      new THREE.Vector3(-0.02, 0.10, -0.04),
      new THREE.Vector3(-0.02, -0.30, -0.06),
      new THREE.Vector3(-0.02, -0.58, -0.05) // Branches at pelvis
    ];
    const aortaDescentPath = new THREE.CatmullRomCurve3(aortaDescentPoints);
    const aortaDescentGeom = new THREE.TubeGeometry(aortaDescentPath, 16, 0.016, 6, false);
    const aortaDescentMesh = new THREE.Mesh(aortaDescentGeom, this.materials.artery);
    arteryGroup.add(aortaDescentMesh);

    // Branching Carotid Arteries (Up to Head)
    const leftCarotidPoints = [
      new THREE.Vector3(-0.03, 0.65, 0.05),
      new THREE.Vector3(-0.06, 0.95, 0.04),
      new THREE.Vector3(-0.06, 1.45, 0.06)
    ];
    const leftCarotidPath = new THREE.CatmullRomCurve3(leftCarotidPoints);
    const leftCarotidGeom = new THREE.TubeGeometry(leftCarotidPath, 8, 0.009, 5, false);
    const leftCarotid = new THREE.Mesh(leftCarotidGeom, this.materials.artery);
    this.tagMesh(leftCarotid, 'carotid_arteries', 'cardiovascular', new THREE.Vector3(-0.15, 0.3, 0.15));
    arteryGroup.add(leftCarotid);

    const rightCarotidPoints = leftCarotidPoints.map(p => new THREE.Vector3(-p.x, p.y, p.z));
    const rightCarotidPath = new THREE.CatmullRomCurve3(rightCarotidPoints);
    const rightCarotidGeom = new THREE.TubeGeometry(rightCarotidPath, 8, 0.009, 5, false);
    const rightCarotid = new THREE.Mesh(rightCarotidGeom, this.materials.artery);
    this.tagMesh(rightCarotid, 'carotid_arteries', 'cardiovascular', new THREE.Vector3(0.15, 0.3, 0.15));
    arteryGroup.add(rightCarotid);

    // Femoral Arteries (Down Limbs)
    const leftFemoralPoints = [
      new THREE.Vector3(-0.02, -0.58, -0.05),
      new THREE.Vector3(-0.12, -0.75, 0.0),
      new THREE.Vector3(-0.13, -1.5, 0.01),
      new THREE.Vector3(-0.12, -2.4, 0.0)
    ];
    const leftFemoralPath = new THREE.CatmullRomCurve3(leftFemoralPoints);
    const leftFemoralGeom = new THREE.TubeGeometry(leftFemoralPath, 16, 0.012, 5, false);
    const leftFemoral = new THREE.Mesh(leftFemoralGeom, this.materials.artery);
    this.tagMesh(leftFemoral, 'femoral_arteries', 'cardiovascular', new THREE.Vector3(-0.2, -0.4, 0.1));
    arteryGroup.add(leftFemoral);

    const rightFemoralPoints = leftFemoralPoints.map(p => new THREE.Vector3(-p.x, p.y, p.z));
    const rightFemoralPath = new THREE.CatmullRomCurve3(rightFemoralPoints);
    const rightFemoralGeom = new THREE.TubeGeometry(rightFemoralPath, 16, 0.012, 5, false);
    const rightFemoral = new THREE.Mesh(rightFemoralGeom, this.materials.artery);
    this.tagMesh(rightFemoral, 'femoral_arteries', 'cardiovascular', new THREE.Vector3(0.2, -0.4, 0.1));
    arteryGroup.add(rightFemoral);

    this.tagMesh(arteryGroup, 'arteries', 'cardiovascular', new THREE.Vector3(0, 0, 0.1));
    group.add(arteryGroup);

    // Blue Veins returning system
    const veinGroup = new THREE.Group();

    // Superior / Inferior Vena Cava line
    const vcDescentPoints = [
      new THREE.Vector3(0.02, 0.50, 0.02),
      new THREE.Vector3(0.02, 0.10, -0.03),
      new THREE.Vector3(0.02, -0.30, -0.05),
      new THREE.Vector3(0.02, -0.58, -0.04)
    ];
    const vcDescentPath = new THREE.CatmullRomCurve3(vcDescentPoints);
    const vcDescentGeom = new THREE.TubeGeometry(vcDescentPath, 16, 0.018, 6, false);
    const vcDescentMesh = new THREE.Mesh(vcDescentGeom, this.materials.vein);
    this.tagMesh(vcDescentMesh, 'vena_cava', 'cardiovascular', new THREE.Vector3(0.05, 0.1, 0.15));
    veinGroup.add(vcDescentMesh);

    // Jugular Veins (Neck)
    const leftJugularPoints = [
      new THREE.Vector3(-0.04, 0.65, 0.05),
      new THREE.Vector3(-0.08, 0.95, 0.04),
      new THREE.Vector3(-0.08, 1.45, 0.06)
    ];
    const leftJugularPath = new THREE.CatmullRomCurve3(leftJugularPoints);
    const leftJugularGeom = new THREE.TubeGeometry(leftJugularPath, 8, 0.011, 5, false);
    const leftJugular = new THREE.Mesh(leftJugularGeom, this.materials.vein);
    this.tagMesh(leftJugular, 'jugular_veins', 'cardiovascular', new THREE.Vector3(-0.18, 0.3, 0.15));
    veinGroup.add(leftJugular);

    const rightJugularPoints = leftJugularPoints.map(p => new THREE.Vector3(-p.x, p.y, p.z));
    const rightJugularPath = new THREE.CatmullRomCurve3(rightJugularPoints);
    const rightJugularGeom = new THREE.TubeGeometry(rightJugularPath, 8, 0.011, 5, false);
    const rightJugular = new THREE.Mesh(rightJugularGeom, this.materials.vein);
    this.tagMesh(rightJugular, 'jugular_veins', 'cardiovascular', new THREE.Vector3(0.18, 0.3, 0.15));
    veinGroup.add(rightJugular);

    this.tagMesh(veinGroup, 'veins', 'cardiovascular', new THREE.Vector3(0, 0, 0.08));
    group.add(veinGroup);

    return group;
  },

  /**
   * Nervous System Construction (Brain, Spinal Cord, Main branching nerves)
   */
  buildNervous() {
    const group = new THREE.Group();

    // 1. BRAIN
    const brainGroup = new THREE.Group();
    brainGroup.position.set(0, 1.62, 0.02);

    // Cerebrum (Left Hemisphere)
    const leftCerebrumGeom = new THREE.SphereGeometry(0.12, 16, 16);
    leftCerebrumGeom.scale(0.8, 1.1, 1.15);
    const leftCerebrum = new THREE.Mesh(leftCerebrumGeom, this.materials.nervous);
    leftCerebrum.position.set(-0.06, 0.03, 0.02);
    this.tagMesh(leftCerebrum, 'cerebrum', 'nervous', new THREE.Vector3(-0.15, 0.2, 0.15));
    brainGroup.add(leftCerebrum);

    // Cerebrum (Right Hemisphere)
    const rightCerebrum = leftCerebrum.clone();
    rightCerebrum.position.x = 0.06;
    this.tagMesh(rightCerebrum, 'cerebrum', 'nervous', new THREE.Vector3(0.15, 0.2, 0.15));
    brainGroup.add(rightCerebrum);

    // Cerebellum
    const cerebellumGeom = new THREE.SphereGeometry(0.07, 12, 12);
    cerebellumGeom.scale(1.2, 0.8, 0.9);
    const cerebellumMesh = new THREE.Mesh(cerebellumGeom, this.materials.nervous);
    cerebellumMesh.position.set(0, -0.08, -0.06);
    this.tagMesh(cerebellumMesh, 'cerebellum', 'nervous', new THREE.Vector3(0, 0.05, -0.2));
    brainGroup.add(cerebellumMesh);

    // Brainstem
    const brainstemGeom = new THREE.CylinderGeometry(0.025, 0.018, 0.1, 8);
    const brainstemMesh = new THREE.Mesh(brainstemGeom, this.materials.nervous);
    brainstemMesh.position.set(0, -0.14, -0.04);
    this.tagMesh(brainstemMesh, 'brainstem', 'nervous', new THREE.Vector3(0, -0.02, -0.15));
    brainGroup.add(brainstemMesh);

    this.tagMesh(brainGroup, 'brain', 'nervous', new THREE.Vector3(0, 0.35, 0.15));
    group.add(brainGroup);

    // 2. SPINAL CORD
    const scPoints = [
      new THREE.Vector3(0, 1.48, -0.06),
      new THREE.Vector3(0, 1.1, -0.08),
      new THREE.Vector3(0, 0.5, -0.08),
      new THREE.Vector3(0, -0.2, -0.08),
      new THREE.Vector3(0, -0.55, -0.06) // Terminus
    ];
    const scPath = new THREE.CatmullRomCurve3(scPoints);
    const scGeom = new THREE.TubeGeometry(scPath, 24, 0.012, 6, false);
    const scMesh = new THREE.Mesh(scGeom, this.materials.nervous);
    this.tagMesh(scMesh, 'spinal_cord', 'nervous', new THREE.Vector3(0, 0, -0.25));
    group.add(scMesh);

    // 3. PERIPHERAL NERVES (Major branches)
    const nervesGroup = new THREE.Group();

    // Sciatic Nerves (Large fibers down posterior leg)
    const leftSciaticPoints = [
      new THREE.Vector3(-0.04, -0.55, -0.06),
      new THREE.Vector3(-0.11, -0.76, -0.05),
      new THREE.Vector3(-0.13, -1.5, -0.04),
      new THREE.Vector3(-0.12, -2.4, -0.02)
    ];
    const leftSciaticPath = new THREE.CatmullRomCurve3(leftSciaticPoints);
    const leftSciaticGeom = new THREE.BufferGeometry().setFromPoints(leftSciaticPath.getPoints(20));
    const leftSciatic = new THREE.Line(leftSciaticGeom, this.materials.nervousLine);
    this.tagMesh(leftSciatic, 'sciatic_nerve', 'nervous', new THREE.Vector3(-0.2, -0.4, -0.1));
    nervesGroup.add(leftSciatic);

    const rightSciaticPoints = leftSciaticPoints.map(p => new THREE.Vector3(-p.x, p.y, p.z));
    const rightSciaticPath = new THREE.CatmullRomCurve3(rightSciaticPoints);
    const rightSciaticGeom = new THREE.BufferGeometry().setFromPoints(rightSciaticPath.getPoints(20));
    const rightSciatic = new THREE.Line(rightSciaticGeom, this.materials.nervousLine);
    this.tagMesh(rightSciatic, 'sciatic_nerve', 'nervous', new THREE.Vector3(0.2, -0.4, -0.1));
    nervesGroup.add(rightSciatic);

    // Vagus Nerve (Winding from neck down to chest/abdomen)
    const leftVagusPoints = [
      new THREE.Vector3(-0.04, 1.48, -0.05),
      new THREE.Vector3(-0.05, 1.1, -0.04),
      new THREE.Vector3(-0.03, 0.7, 0.02),
      new THREE.Vector3(-0.04, 0.5, 0.05),
      new THREE.Vector3(-0.06, 0.2, 0.08)
    ];
    const leftVagusPath = new THREE.CatmullRomCurve3(leftVagusPoints);
    const leftVagusGeom = new THREE.BufferGeometry().setFromPoints(leftVagusPath.getPoints(15));
    const leftVagus = new THREE.Line(leftVagusGeom, this.materials.nervousLine);
    this.tagMesh(leftVagus, 'vagus_nerve', 'nervous', new THREE.Vector3(-0.1, 0.1, 0.15));
    nervesGroup.add(leftVagus);

    this.tagMesh(nervesGroup, 'peripheral_nerves', 'nervous', new THREE.Vector3(0, -0.15, 0));
    group.add(nervesGroup);

    return group;
  },

  /**
   * Reproductive System Construction (Male/Female specific)
   */
  buildReproductive(gender) {
    const group = new THREE.Group();
    const isFemale = gender === 'female';

    if (isFemale) {
      const femaleGroup = new THREE.Group();
      femaleGroup.position.set(0, -0.85, 0.02);

      // Uterus (pear shape in center)
      const uterusGeom = new THREE.SphereGeometry(0.04, 12, 12);
      uterusGeom.scale(1, 1.4, 0.8);
      const uterusMesh = new THREE.Mesh(uterusGeom, this.materials.reproductive);
      uterusMesh.position.set(0, 0.02, 0);
      this.tagMesh(uterusMesh, 'uterus', 'reproductive', new THREE.Vector3(0, -0.1, 0.25));
      femaleGroup.add(uterusMesh);

      // Ovaries (two small spheres on sides with Fallopian tube links)
      const leftOvaryGeom = new THREE.SphereGeometry(0.015, 8, 8);
      leftOvaryGeom.scale(1.3, 0.9, 0.9);
      const leftOvary = new THREE.Mesh(leftOvaryGeom, this.materials.reproductive);
      leftOvary.position.set(-0.07, 0.04, -0.01);
      this.tagMesh(leftOvary, 'ovaries', 'reproductive', new THREE.Vector3(-0.15, -0.05, 0.15));
      femaleGroup.add(leftOvary);

      const rightOvary = leftOvary.clone();
      rightOvary.position.x = 0.07;
      this.tagMesh(rightOvary, 'ovaries', 'reproductive', new THREE.Vector3(0.15, -0.05, 0.15));
      femaleGroup.add(rightOvary);

      // Fallopian tube representation lines
      const ftPoints = [
        new THREE.Vector3(-0.07, 0.04, -0.01),
        new THREE.Vector3(-0.04, 0.07, 0.0),
        new THREE.Vector3(0, 0.05, 0.0)
      ];
      const ftPath = new THREE.CatmullRomCurve3(ftPoints);
      const ftGeom = new THREE.TubeGeometry(ftPath, 8, 0.005, 4, false);
      const ftMeshLeft = new THREE.Mesh(ftGeom, this.materials.reproductive);
      femaleGroup.add(ftMeshLeft);

      const ftPointsRight = ftPoints.map(p => new THREE.Vector3(-p.x, p.y, p.z));
      const ftPathRight = new THREE.CatmullRomCurve3(ftPointsRight);
      const ftGeomRight = new THREE.TubeGeometry(ftPathRight, 8, 0.005, 4, false);
      const ftMeshRight = new THREE.Mesh(ftGeomRight, this.materials.reproductive);
      femaleGroup.add(ftMeshRight);

      this.tagMesh(femaleGroup, 'female_reproductive', 'reproductive', new THREE.Vector3(0, -0.1, 0.25));
      group.add(femaleGroup);
    } else {
      const maleGroup = new THREE.Group();
      maleGroup.position.set(0, -0.92, 0.05);

      // Prostate (walnut shape)
      const prostateGeom = new THREE.SphereGeometry(0.024, 10, 10);
      prostateGeom.scale(1.1, 0.9, 1.1);
      const prostateMesh = new THREE.Mesh(prostateGeom, this.materials.reproductive);
      prostateMesh.position.set(0, 0.06, -0.02);
      this.tagMesh(prostateMesh, 'prostate', 'reproductive', new THREE.Vector3(0, -0.05, 0.2));
      maleGroup.add(prostateMesh);

      // Testes (suspended ellipsoids)
      const leftTestisGeom = new THREE.SphereGeometry(0.018, 8, 8);
      leftTestisGeom.scale(0.8, 1.2, 0.9);
      const leftTestis = new THREE.Mesh(leftTestisGeom, this.materials.reproductive);
      leftTestis.position.set(-0.025, -0.02, 0.01);
      leftTestis.rotation.z = Math.PI / 18;
      this.tagMesh(leftTestis, 'testes', 'reproductive', new THREE.Vector3(-0.08, -0.15, 0.25));
      maleGroup.add(leftTestis);

      const rightTestis = leftTestis.clone();
      rightTestis.position.x = 0.025;
      rightTestis.rotation.z = -Math.PI / 18;
      this.tagMesh(rightTestis, 'testes', 'reproductive', new THREE.Vector3(0.08, -0.15, 0.25));
      maleGroup.add(rightTestis);

      this.tagMesh(maleGroup, 'male_reproductive', 'reproductive', new THREE.Vector3(0, -0.1, 0.25));
      group.add(maleGroup);
    }

    return group;
  },

  createBodyGeometry(gender, scale = 1.0) {
    const isFemale = gender === 'female';
    const contours = [
      { y: 1.8, rx: 0.18, rz: 0.18 },
      { y: 1.6, rx: 0.22, rz: 0.22 },
      { y: 1.4, rx: 0.18, rz: 0.16 },
      { y: 1.25, rx: 0.12, rz: 0.12 },
      { y: 1.0, rx: 0.32, rz: isFemale ? 0.44 : 0.52 },
      { y: 0.6, rx: 0.30, rz: isFemale ? 0.38 : 0.45 },
      { y: 0.2, rx: 0.26, rz: isFemale ? 0.28 : 0.36 },
      { y: -0.2, rx: 0.30, rz: isFemale ? 0.34 : 0.36 },
      { y: -0.6, rx: 0.34, rz: isFemale ? 0.46 : 0.42 },
      { y: -1.0, rx: 0.22, rz: 0.36 },
      { y: -1.5, rx: 0.18, rz: 0.28 },
      { y: -1.9, rx: 0.13, rz: 0.16 },
      { y: -2.3, rx: 0.12, rz: 0.16 },
      { y: -2.7, rx: 0.08, rz: 0.10 }
    ];

    const meshGeom = new THREE.BufferGeometry();
    const points = [];
    const segments = 32;

    for (let i = 0; i < contours.length; i++) {
      const c = contours[i];
      for (let j = 0; j < segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        const x = Math.sin(theta) * c.rz * scale;
        const xCoord = x;
        const yCoord = c.y * (1 + (scale - 1) * 0.05); // scale height slightly to preserve proportions
        const zCoord = Math.cos(theta) * c.rx * scale;
        points.push(new THREE.Vector3(xCoord, yCoord, zCoord));
      }
    }

    const vertices = [];
    points.forEach(p => {
      vertices.push(p.x, p.y, p.z);
    });
    meshGeom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const indices = [];
    for (let i = 0; i < contours.length - 1; i++) {
      for (let j = 0; j < segments; j++) {
        const nextJ = (j + 1) % segments;
        const currRow = i * segments;
        const nextRow = (i + 1) * segments;

        indices.push(currRow + j, nextRow + j, currRow + nextJ);
        indices.push(currRow + nextJ, nextRow + j, nextRow + nextJ);
      }
    }
    meshGeom.setIndex(indices);
    meshGeom.computeVertexNormals();

    return meshGeom;
  },

  buildSkin(gender) {
    const group = new THREE.Group();

    // Concentric shells: Epidermis (1.03), Dermis (1.01), Subcutaneous (0.99)
    const epiGeom = this.createBodyGeometry(gender, 1.03);
    const epiMesh = new THREE.Mesh(epiGeom, this.materials.epidermis);
    this.tagMesh(epiMesh, 'epidermis', 'skin', new THREE.Vector3(0, 0, 0.15));
    group.add(epiMesh);

    const derGeom = this.createBodyGeometry(gender, 1.01);
    const derMesh = new THREE.Mesh(derGeom, this.materials.dermis);
    this.tagMesh(derMesh, 'dermis', 'skin', new THREE.Vector3(0, 0, 0.1));
    group.add(derMesh);

    const subGeom = this.createBodyGeometry(gender, 0.99);
    const subMesh = new THREE.Mesh(subGeom, this.materials.subcutaneous);
    this.tagMesh(subMesh, 'subcutaneous', 'skin', new THREE.Vector3(0, 0, 0.05));
    group.add(subMesh);

    this.tagMesh(group, 'skin', 'skin', new THREE.Vector3(0, 0, 0.1));
    return group;
  },

  buildBlood() {
    const group = new THREE.Group();

    const paths = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.02, 0.50, 0.02),
        new THREE.Vector3(-0.02, 0.10, -0.04),
        new THREE.Vector3(-0.02, -0.30, -0.06),
        new THREE.Vector3(-0.02, -0.58, -0.05)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.03, 0.65, 0.05),
        new THREE.Vector3(-0.06, 0.95, 0.04),
        new THREE.Vector3(-0.06, 1.45, 0.06)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.03, 0.65, 0.05),
        new THREE.Vector3(0.06, 0.95, 0.04),
        new THREE.Vector3(0.06, 1.45, 0.06)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.02, -0.58, -0.05),
        new THREE.Vector3(-0.12, -0.75, 0.0),
        new THREE.Vector3(-0.13, -1.5, 0.01),
        new THREE.Vector3(-0.12, -2.4, 0.0)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.02, -0.58, -0.05),
        new THREE.Vector3(0.12, -0.75, 0.0),
        new THREE.Vector3(0.13, -1.5, 0.01),
        new THREE.Vector3(0.12, -2.4, 0.0)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.02, 0.50, 0.02),
        new THREE.Vector3(0.02, 0.10, -0.03),
        new THREE.Vector3(0.02, -0.30, -0.05),
        new THREE.Vector3(0.02, -0.58, -0.04)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.04, 0.65, 0.05),
        new THREE.Vector3(-0.08, 0.95, 0.04),
        new THREE.Vector3(-0.08, 1.45, 0.06)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.04, 0.65, 0.05),
        new THREE.Vector3(0.08, 0.95, 0.04),
        new THREE.Vector3(0.08, 1.45, 0.06)
      ])
    ];

    const rbcGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.004, 8);
    rbcGeom.scale(1, 0.5, 1);

    const wbcGeom = new THREE.DodecahedronGeometry(0.014);

    const plateletGeom = new THREE.TetrahedronGeometry(0.007);
    plateletGeom.scale(1.2, 0.6, 0.8);

    paths.forEach((path, pathIdx) => {
      const pointsCount = 12;
      for (let i = 0; i < pointsCount; i++) {
        const t = (i + 0.1 + Math.random() * 0.1) / pointsCount;
        const pos = path.getPointAt(t);

        const offset = new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        );
        pos.add(offset);

        const rand = Math.random();
        let cell;
        if (rand < 0.7) {
          cell = new THREE.Mesh(rbcGeom, this.materials.rbc);
          this.tagMesh(cell, 'red_blood_cells', 'blood', new THREE.Vector3(0.05, 0, 0.1));
        } else if (rand < 0.85) {
          cell = new THREE.Mesh(wbcGeom, this.materials.wbc);
          this.tagMesh(cell, 'white_blood_cells', 'blood', new THREE.Vector3(-0.05, 0.05, 0.1));
        } else {
          cell = new THREE.Mesh(plateletGeom, this.materials.platelet);
          this.tagMesh(cell, 'platelets', 'blood', new THREE.Vector3(0, -0.05, 0.1));
        }

        cell.position.copy(pos);
        cell.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        group.add(cell);
      }
    });

    this.tagMesh(group, 'blood', 'blood', new THREE.Vector3(0, 0, 0.05));
    return group;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ANATOMY_BUILDER;
} else {
  window.ANATOMY_BUILDER = ANATOMY_BUILDER;
}
