export default class Worklog {
  constructor() {
    this.eventSource = new EventSource('https://dashboard-backend-8cy1.onrender.com/sse');
    this.worklog = document.querySelector('.worklog-container');
  }

  init() {
    this.eventSource.addEventListener('message', (e) => {
      const newLog = Worklog.createLogItem(JSON.parse(e.data));
      this.worklog.appendChild(newLog);
    });
  }

  static createLogItem(data) {
    const item = document.createElement('div');
    item.className = 'log-item';

    item.innerHTML = `
      <div class="timestamp">${data.timeStamp}</div>
      <div class="server">Server: ${data.id}</div>
      <div class="info">INFO: ${data.info}</div>      
    `;

    return item;
  }
}
