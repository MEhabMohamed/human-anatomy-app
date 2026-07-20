/**
 * Human Anatomy App - Main Controller
 * Coordinates UI states, search engines, tree expansion, and Three.js scene triggers.
 */

class AnatomyApp {
  constructor() {
    this.threeScene = null;
    this.selectedPartId = null;
    this.activeSystemToggles = {
      skeletal: true,
      nervous: true,
      cardiovascular: true,
      digestive: true,
      reproductive: true,
      skin: true,
      blood: true
    };
    
    this.init();
  }

  init() {
    // 1. Initialize 3D Scene Controller
    // Pass callbacks to sync 3D interactions back to UI
    this.threeScene = new AnatomyScene(
      'three-container', 
      this.handlePartSelected.bind(this),
      this.handlePartHovered.bind(this)
    );

    // 2. Render Left Directory Tree
    this.renderDirectoryTree();

    // 3. Set up Event Listeners
    this.setupViewControls();
    this.setupSearch();
    this.setupSystemToggles();
    this.setupDrawer();
  }

  /**
   * Render the Collapsible Hierarchy Tree
   */
  renderDirectoryTree() {
    const treeRoot = document.getElementById('hierarchy-tree');
    treeRoot.innerHTML = '';

    const hierarchy = ANATOMY_DATABASE.hierarchy;

    for (const sysId in hierarchy) {
      const system = hierarchy[sysId];
      
      const details = document.createElement('details');
      details.className = `tree-system-container ${sysId}-node`;
      details.id = `tree-sys-${sysId}`;

      const summary = document.createElement('summary');
      summary.className = 'tree-system-summary';
      
      const titleSpan = document.createElement('span');
      titleSpan.className = 'tree-system-title';
      titleSpan.innerHTML = `<span class="sys-icon">${system.icon}</span> ${system.name}`;
      
      const arrowSpan = document.createElement('span');
      arrowSpan.className = 'tree-system-arrow';
      arrowSpan.innerText = '▶';

      summary.appendChild(titleSpan);
      summary.appendChild(arrowSpan);
      details.appendChild(summary);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'tree-system-content';

      // Recursively build children
      this.buildTreeNodeDOM(system.children, contentDiv, sysId);

      details.appendChild(contentDiv);
      treeRoot.appendChild(details);
    }
  }

  /**
   * Recursive DOM node generator for tree structure
   */
  buildTreeNodeDOM(nodeList, parentElement, systemId) {
    for (const key in nodeList) {
      const item = nodeList[key];
      const flatItem = ANATOMY_DATABASE.flatDatabase[key];
      if (!flatItem) continue;

      const hasChildren = item.children && Object.keys(item.children).length > 0;
      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'tree-node';

      const header = document.createElement(hasChildren ? 'summary' : 'div');
      header.className = 'tree-node-header';
      header.setAttribute('data-id', key);
      
      const arrow = document.createElement('span');
      arrow.className = 'tree-node-arrow';
      arrow.innerText = hasChildren ? '▶' : '•';
      
      const label = document.createElement('span');
      label.className = 'tree-node-label';
      label.innerText = item.name;

      header.appendChild(arrow);
      header.appendChild(label);

      // Handle tree click
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handlePartSelected(key);
      });

      if (hasChildren) {
        const details = document.createElement('details');
        details.appendChild(header);
        
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'tree-node-children';
        
        this.buildTreeNodeDOM(item.children, childrenContainer, systemId);
        details.appendChild(childrenContainer);
        
        nodeDiv.appendChild(details);
      } else {
        nodeDiv.appendChild(header);
      }

      parentElement.appendChild(nodeDiv);
    }
  }

  /**
   * Triggered when a part is selected (either by click in 3D, tree, search, or sub-part navigation)
   */
  handlePartSelected(partId) {
    if (this.selectedPartId === partId && partId !== null) return;
    this.selectedPartId = partId;

    // 1. Sync camera focus in 3D Viewport
    this.threeScene.focusOnPart(partId);

    // 2. Clear previous active highlights in left tree
    document.querySelectorAll('.tree-node-header.active').forEach(el => {
      el.classList.remove('active');
    });

    if (!partId) {
      this.closeInfoDrawer();
      return;
    }

    // 3. Highlight and expand tree path to this node
    const dbItem = ANATOMY_DATABASE.flatDatabase[partId];
    if (dbItem) {
      // Highlight tree row
      const treeEl = document.querySelector(`.tree-node-header[data-id="${partId}"]`);
      if (treeEl) {
        treeEl.classList.add('active');
        
        // Expand all parents details tags
        let parent = treeEl.parentElement;
        while (parent && parent !== document.getElementById('hierarchy-tree')) {
          if (parent.tagName === 'DETAILS') {
            parent.open = true;
          }
          parent = parent.parentElement;
        }
        
        // Scroll left tree panel to see the item
        treeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // 4. Update and slide open Info Drawer on the right
      this.updateInfoDrawer(dbItem);
    }
  }

  /**
   * Soft hover indicators to label parts without clicking
   */
  handlePartHovered(partId) {
    const statusText = document.querySelector('.status-text');
    if (partId) {
      const dbItem = ANATOMY_DATABASE.flatDatabase[partId];
      if (dbItem) {
        statusText.innerHTML = `Hovering: <span style="color: #6366f1; font-weight: 600;">${dbItem.name}</span>`;
      }
    } else {
      statusText.innerHTML = 'System Diagnostics: Active';
    }
  }

  /**
   * Bind overlay panel actions
   */
  setupViewControls() {
    // Gender Toggles
    const btnMale = document.getElementById('btn-male');
    const btnFemale = document.getElementById('btn-female');

    btnMale.addEventListener('click', () => {
      btnMale.classList.add('active');
      btnFemale.classList.remove('active');
      this.threeScene.setGender('male');
    });

    btnFemale.addEventListener('click', () => {
      btnFemale.classList.add('active');
      btnMale.classList.remove('active');
      this.threeScene.setGender('female');
    });

    // Reset view
    document.getElementById('btn-reset-view').addEventListener('click', () => {
      this.handlePartSelected(null);
    });

    // Explode View slider
    const explodeSlider = document.getElementById('explode-slider');
    const explodeVal = document.getElementById('explode-value');
    
    explodeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      explodeVal.innerText = `${val}%`;
      this.threeScene.setExplodeFactor(val / 100);
    });
  }

  /**
   * Bind Layer Filter visibility checkboxes
   */
  setupSystemToggles() {
    const systems = ['skeletal', 'nervous', 'cardiovascular', 'digestive', 'reproductive', 'skin', 'blood'];
    
    systems.forEach(sysId => {
      const chk = document.getElementById(`toggle-${sysId}`);
      if (chk) {
        // Sync initial state
        chk.checked = this.activeSystemToggles[sysId];
        this.threeScene.toggleSystemVisibility(sysId, chk.checked);

        chk.addEventListener('change', (e) => {
          const isChecked = e.target.checked;
          this.activeSystemToggles[sysId] = isChecked;
          this.threeScene.toggleSystemVisibility(sysId, isChecked);

          // If the system containing the active part is toggled off, close info
          if (!isChecked && this.selectedPartId) {
            const currentItem = ANATOMY_DATABASE.flatDatabase[this.selectedPartId];
            if (currentItem && currentItem.system === sysId) {
              this.handlePartSelected(null);
            }
          }
        });
      }
    });
  }

  /**
   * Search Input and Autocomplete Indexing
   */
  setupSearch() {
    const searchInput = document.getElementById('anatomy-search');
    const clearBtn = document.getElementById('clear-search-btn');
    const resultsPanel = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      
      if (query.length === 0) {
        clearBtn.classList.add('hidden');
        resultsPanel.classList.add('hidden');
        return;
      }

      clearBtn.classList.remove('hidden');

      // Search matching flat database items
      const matches = [];
      const flatDb = ANATOMY_DATABASE.flatDatabase;

      for (const key in flatDb) {
        const item = flatDb[key];
        
        // Check if query matches name, sub-parts, or system name
        if (item.name.toLowerCase().includes(query) || 
            item.id.toLowerCase().includes(query) ||
            item.system.toLowerCase().includes(query)) {
          matches.push(item);
        }
      }

      this.renderSearchResults(matches);
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.add('hidden');
      resultsPanel.classList.add('hidden');
      searchInput.focus();
    });

    // Close search box on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        resultsPanel.classList.add('hidden');
      }
    });
  }

  renderSearchResults(results) {
    const resultsPanel = document.getElementById('search-results');
    resultsPanel.innerHTML = '';

    if (results.length === 0) {
      const div = document.createElement('div');
      div.className = 'search-result-item';
      div.style.color = 'var(--text-dark)';
      div.innerText = 'No anatomical structures match your query';
      resultsPanel.appendChild(div);
    } else {
      // Limit to 8 items to prevent overflow issues
      results.slice(0, 8).forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        
        const system = ANATOMY_DATABASE.hierarchy[item.system];
        const systemColor = system ? system.color : 'inherit';

        div.innerHTML = `
          <span class="result-name">${item.name}</span>
          <span class="result-system" style="color: ${systemColor}; border: 1px solid ${systemColor}25;">${item.system}</span>
        `;

        div.addEventListener('click', () => {
          this.handlePartSelected(item.id);
          resultsPanel.classList.add('hidden');
          document.getElementById('anatomy-search').value = '';
          document.getElementById('clear-search-btn').classList.add('hidden');
        });

        resultsPanel.appendChild(div);
      });
    }

    resultsPanel.classList.remove('hidden');
  }

  /**
   * Info Drawer bindings & rendering
   */
  setupDrawer() {
    document.getElementById('close-drawer-btn').addEventListener('click', () => {
      this.handlePartSelected(null);
    });
  }

  updateInfoDrawer(dbItem) {
    const drawer = document.getElementById('info-drawer');
    const emptyState = document.getElementById('info-empty-state');
    const bodyContent = document.getElementById('info-body-content');

    // 1. Breadcrumbs
    const bcContainer = document.getElementById('info-breadcrumbs');
    bcContainer.innerHTML = '';
    dbItem.path.forEach((p, idx) => {
      const span = document.createElement('span');
      span.innerText = p.name;
      bcContainer.appendChild(span);
      if (idx < dbItem.path.length - 1) {
        const sep = document.createElement('span');
        sep.innerText = ' > ';
        bcContainer.appendChild(sep);
      }
    });

    // 2. Title & Badge
    document.getElementById('info-title').innerText = dbItem.name;
    const badge = document.getElementById('info-system-badge');
    
    const system = ANATOMY_DATABASE.hierarchy[dbItem.system];
    badge.innerText = system ? system.name : dbItem.system;
    badge.className = `system-badge ${dbItem.system}-badge`;

    // 3. Description
    document.getElementById('info-description').innerText = dbItem.description;

    // 3.5. Infections & Cures
    const infSection = document.getElementById('info-infections-section');
    const infList = document.getElementById('info-infections-list');
    infList.innerHTML = '';

    if (dbItem.infections && dbItem.infections.length > 0) {
      infSection.classList.remove('hidden');
      dbItem.infections.forEach(inf => {
        let icon = '🦠';
        const nameLower = inf.name.toLowerCase();
        if (
          nameLower.includes('tumor') || 
          nameLower.includes('cancer') || 
          nameLower.includes('sarcoma') || 
          nameLower.includes('glioma') || 
          nameLower.includes('adenocarcinoma') || 
          nameLower.includes('meningioma') || 
          nameLower.includes('osteoma') || 
          nameLower.includes('chordoma') || 
          nameLower.includes('leukemia') || 
          nameLower.includes('lymphoma') || 
          nameLower.includes('myeloma') || 
          nameLower.includes('bph') || 
          nameLower.includes('fibroid') || 
          nameLower.includes('seminoma') || 
          nameLower.includes('ameloblastoma') || 
          nameLower.includes('oncocytoma') || 
          nameLower.includes('melanoma') || 
          nameLower.includes('cyst') ||
          nameLower.includes('neuropathy') ||
          nameLower.includes('hyperplasia') ||
          nameLower.includes('neoplasm') ||
          nameLower.includes('adenoma')
        ) {
          icon = '🎗️';
        } else if (
          nameLower.includes('viral') || 
          nameLower.includes('virus') || 
          nameLower.includes('hiv') || 
          nameLower.includes('hepatitis') || 
          nameLower.includes('mononucleosis') || 
          nameLower.includes('dengue') || 
          nameLower.includes('poliomyelitis') || 
          nameLower.includes('polio') || 
          nameLower.includes('zoster') || 
          nameLower.includes('shingles') || 
          nameLower.includes('rotavirus') ||
          nameLower.includes('jc') ||
          nameLower.includes('pml')
        ) {
          icon = '🧬';
        } else if (
          nameLower.includes('bacterial') || 
          nameLower.includes('osteomyelitis') || 
          nameLower.includes('sinusitis') || 
          nameLower.includes('abscess') || 
          nameLower.includes('tuberculosis') || 
          nameLower.includes('chondritis') || 
          nameLower.includes('endocarditis') || 
          nameLower.includes('aortitis') || 
          nameLower.includes('arteritis') || 
          nameLower.includes('meningitis') || 
          nameLower.includes('listeria') || 
          nameLower.includes('pneumonia') || 
          nameLower.includes('salmonella') || 
          nameLower.includes('colitis') || 
          nameLower.includes('pyelonephritis') || 
          nameLower.includes('glomerulonephritis') || 
          nameLower.includes('prostatitis') || 
          nameLower.includes('endometritis') || 
          nameLower.includes('pid') || 
          nameLower.includes('oophoritis') || 
          nameLower.includes('cellulitis') || 
          nameLower.includes('fasciitis') || 
          nameLower.includes('impetigo') || 
          nameLower.includes('folliculitis') || 
          nameLower.includes('erysipelas') || 
          nameLower.includes('sepsis') || 
          nameLower.includes('septicemia') || 
          nameLower.includes('bacteremia') ||
          nameLower.includes('strep') ||
          nameLower.includes('septic') ||
          nameLower.includes('infection')
        ) {
          icon = '🧫';
        }

        const details = document.createElement('details');
        details.className = 'infection-card';
        
        details.innerHTML = `
          <summary class="infection-summary">
            <div class="infection-title-wrapper">
              <span class="infection-icon-badge">${icon}</span>
              <span>${inf.name}</span>
            </div>
            <span class="infection-arrow">▶</span>
          </summary>
          <div class="infection-card-content">
            <div class="infection-subtitle">Description</div>
            <p>${inf.desc}</p>
            <div class="infection-subtitle">Standard Treatment & Cure</div>
            <div class="infection-cure-text">${inf.cure}</div>
          </div>
        `;
        infList.appendChild(details);
      });
    } else {
      infSection.classList.add('hidden');
    }

    // 4. Substructures
    const childSection = document.getElementById('info-children-section');
    const childList = document.getElementById('info-children-list');
    childList.innerHTML = '';

    if (dbItem.children && dbItem.children.length > 0) {
      childSection.classList.remove('hidden');
      dbItem.children.forEach(childKey => {
        const childItem = ANATOMY_DATABASE.flatDatabase[childKey];
        if (childItem) {
          const btn = document.createElement('button');
          btn.className = 'substructure-btn';
          btn.innerHTML = `
            <span>${childItem.name}</span>
            <span>🔍 Zoom</span>
          `;
          btn.addEventListener('click', () => {
            this.handlePartSelected(childKey);
          });
          childList.appendChild(btn);
        }
      });
    } else {
      childSection.classList.add('hidden');
    }

    // 5. External Redirect Button
    const redirectBtn = document.getElementById('info-redirect-btn');
    if (dbItem.externalUrl) {
      redirectBtn.parentElement.classList.remove('hidden');
      const newRedirectBtn = redirectBtn.cloneNode(true);
      newRedirectBtn.innerHTML = `📖 ${dbItem.name} Reference Directory &rarr;`;
      redirectBtn.parentNode.replaceChild(newRedirectBtn, redirectBtn);
      
      newRedirectBtn.addEventListener('click', () => {
        window.open(dbItem.externalUrl, '_blank');
      });
    } else {
      redirectBtn.parentElement.classList.add('hidden');
    }

    // Toggle panels
    emptyState.classList.add('hidden');
    bodyContent.classList.remove('hidden');
    drawer.classList.remove('closed');
  }

  closeInfoDrawer() {
    const drawer = document.getElementById('info-drawer');
    const emptyState = document.getElementById('info-empty-state');
    const bodyContent = document.getElementById('info-body-content');

    drawer.classList.add('closed');
    setTimeout(() => {
      emptyState.classList.remove('hidden');
      bodyContent.classList.add('hidden');
    }, 200); // Sync animation fade
  }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AnatomyApp();
});
