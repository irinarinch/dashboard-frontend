import stopped from '../images/stopped.png';
import running from '../images/running.png';
import pause from '../images/pause.png';
import start from '../images/start.png';
import remover from '../images/remover.png';

import Instance from './Instance';

export default class Widget {
  constructor() {
    this.widgetContainer = document.querySelector('.instances');
    this.websocket = new WebSocket('ws://dashboard-backend-8cy1.onrender.com/');
  }

  init() {
    this.render();

    document.addEventListener('click', (e) => {
      this.createInstance(e);
      this.deleteInstance(e);
      this.startInstance(e);
    });
  }

  createInstance(e) {
    if (!e.target.closest('button')) return;

    Instance.post();

    setTimeout(() => {
      this.render();
    }, 11000);
  }

  deleteInstance(e) {
    if (!e.target.closest('.remover')) return;
    const { id } = e.target.closest('.instance').dataset;

    Instance.delete(id).then(() => {
      this.render();
    });
  }

  startInstance(e) {
    if (e.target.closest('.stopped-action') || e.target.closest('.running-action')) {
      const { id } = e.target.closest('.instance').dataset;

      this.websocket.send(JSON.stringify({ id }));
      this.render();
    }
  }

  render() {
    this.widgetContainer.innerHTML = '';

    Instance.get().then((response) => {
      const instances = response.data;

      instances.forEach((instance) => {
        const newEl = Widget.createElement(instance);
        const el = this.widgetContainer.appendChild(newEl);
        el.dataset.id = instance.id;
      });
    });
  }

  static createElement(instance) {
    const instanceEl = document.createElement('div');
    instanceEl.className = 'instance';

    instanceEl.innerHTML = `
      <div class="instance-id">${instance.id}</div>
      <div class="instance-status">
        <span class="status">Status:</span>
        <img class="status-img ${instance.state}" src=${Widget.getStatusImage(instance)}>
        <span class="status-msg">${instance.state}</span>
      </div>
      <div class="instance-actions">
        <span class="actions">Actions:</span>
        <img class="action-img ${instance.state}-action" src=${Widget.getActionImage(instance)}>
        <img class="action-img remover" src=${remover}>   
      </div>
    `;

    return instanceEl;
  }

  static getStatusImage(instance) {
    if (instance.state === 'stopped') {
      return stopped;
    }
    return running;
  }

  static getActionImage(instance) {
    if (instance.state === 'stopped') {
      return start;
    }
    return pause;
  }
}
