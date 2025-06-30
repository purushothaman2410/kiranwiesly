
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;

// Gallery API
export const galleryApi = {
  // Upload image with title and category
  upload: async (file: File, title: string, category: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);

    const response = await fetch(`${API_BASE_URL}/gallery/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  // Get all images
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  },

  // Get images by category
  getByCategory: async (category: string) => {
    const response = await fetch(`${API_BASE_URL}/gallery?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  },

  // Update image
  update: async (id: string, title: string, category: string) => {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, category }),
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    return response.json();
  },

  // Delete image
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return response.json();
  },
};

// Slider API
export const sliderApi = {
  upload: async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    const response = await fetch(`${API_BASE_URL}/sliders/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/sliders`);
    if (!response.ok) {
      throw new Error('Failed to fetch slider images');
    }
    return response.json();
  },

  update: async (id: string, title: string) => {
    const response = await fetch(`${API_BASE_URL}/sliders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/sliders/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return response.json();
  },
};

// Services API
export const servicesApi = {
  upload: async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    const response = await fetch(`${API_BASE_URL}/services/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return response.json();
  },

  update: async (id: string, title: string) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return response.json();
  },
};

// Profile API
export const profileApi = {
  upload: async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    const response = await fetch(`${API_BASE_URL}/profiles/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile images');
    }
    return response.json();
  },

  update: async (id: string, title: string) => {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return response.json();
  },
};

// Recent Works API
export const recentWorksApi = {
  upload: async (file: File, title: string, category: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);

    const response = await fetch(`${API_BASE_URL}/recentworks/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/recentworks`);
    if (!response.ok) {
      throw new Error('Failed to fetch recent works');
    }
    return response.json();
  },

  getByCategory: async (category: string) => {
    const response = await fetch(`${API_BASE_URL}/recentworks?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recent works');
    }
    return response.json();
  },

  update: async (id: string, title: string, category: string) => {
    const response = await fetch(`${API_BASE_URL}/recentworks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, category }),
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/recentworks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return response.json();
  },
};
