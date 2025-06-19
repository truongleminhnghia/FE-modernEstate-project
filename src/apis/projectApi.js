import axios from 'axios';

const API_BASE_URL = 'https://bemodernestate.site/api/v1';

// Get all projects
export const getProjects = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`, {
      params: {
        pageCurrent: page,
        pageSize: pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

// Create new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Transform API data to match frontend format
export const transformProjectData = (apiProject) => {
  return {
    id: apiProject.id,
    code: apiProject.code,
    name: apiProject.title,
    type: apiProject.typeProject?.replace(/_/g, ' '),
    status: apiProject.status?.replace(/_/g, ' '),
    projectArea: apiProject.projectArea,
    unitArea: apiProject.unitArea,
    priceMin: apiProject.priceMin,
    priceMax: apiProject.priceMax,
    unitCurrency: apiProject.unitCurrency,
    description: apiProject.description,
    totalInvestment: apiProject.totalInvestment,
    timeStart: apiProject.timeStart,
    totalBlock: apiProject.totalBlock,
    blockName: apiProject.blockName,
    totalFloor: apiProject.totalFloor,
    attribute: apiProject.attribute,
    address: apiProject.address,
    invetor: apiProject.invetor,
    images: apiProject.images,
    histories: apiProject.histories,
    // Additional fields for management
    location: apiProject.address ? 
      `${apiProject.address.houseNumber || ''} ${apiProject.address.street || ''}, ${apiProject.address.ward || ''}, ${apiProject.address.district || ''}, ${apiProject.address.city || ''}`.trim() : '',
    projectManager: apiProject.invetor?.name || apiProject.invetor?.companyName || '',
    contactEmail: apiProject.invetor?.email || '',
    contactPhone: apiProject.invetor?.phoneNumber || '',
    budget: apiProject.totalInvestment || 0,
    startDate: apiProject.timeStart,
    expectedCompletion: apiProject.timeStart, // API doesn't provide completion date, using start date as placeholder
    dateCreated: apiProject.histories?.[0]?.changeDate || new Date().toISOString(),
    dateUpdated: apiProject.histories?.[apiProject.histories.length - 1]?.changeDate || new Date().toISOString(),
  };
};

// Transform multiple projects
export const transformProjectsList = (apiProjects) => {
  return apiProjects.map(transformProjectData);
}; 