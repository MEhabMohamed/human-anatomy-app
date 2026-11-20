/**
 * XSS-safe DOM helper utilities for Human Anatomy App.
 */
window.AnatomyDom = {
  createIconTitle(iconText, labelText) {
    const wrapper = document.createElement('span');
    wrapper.className = 'tree-system-title';
    const icon = document.createElement('span');
    icon.className = 'sys-icon';
    icon.textContent = String(iconText ?? '');
    wrapper.appendChild(icon);
    wrapper.appendChild(document.createTextNode(' ' + String(labelText ?? '')));
    return wrapper;
  },
};

