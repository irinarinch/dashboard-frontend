export default class Instance {
  static async get() {
    const array = await fetch('https://dashboard-backend-8cy1.onrender.com/', {
      method: 'GET',
    });

    return array.json();
  }

  static async post() {
    await fetch('https://dashboard-backend-8cy1.onrender.com/', {
      method: 'POST',
    });
  }

  static async delete(id) {
    await fetch(`https://dashboard-backend-8cy1.onrender.com/?id=${id}`, {
      method: 'DELETE',
    });
  }
}
