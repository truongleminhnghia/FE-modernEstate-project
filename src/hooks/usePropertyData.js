import { useQuery } from '@tanstack/react-query';

const usePropertyData = (filters, page = 1, pageSize = 10) => {
  const fetchProperties = async () => {
    // Fetch all data for filtering options, or paged data for display
    const response = await fetch(
      `https://bemodernestate.site/api/v1/posts?page_current=1&page_size=1000`, 
      {
        headers: {
          'accept': '*/*',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };

  const { data: rawData, isLoading, error, refetch } = useQuery({
    queryKey: ['allProperties'], // Use a single key for all data
    queryFn: fetchProperties,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Extract unique filter options
  const allPosts = rawData?.data?.rowDatas || [];
  
  const propertyTypes = [...new Set(allPosts.map(post => post.property?.type).filter(Boolean))];
  const districts = [...new Set(allPosts.map(post => post.property?.address?.district).filter(Boolean))];

  // Filter data based on filters
  const filteredData = allPosts.filter(post => {
    const property = post.property;
    
    if (!property || !property.address) {
      return false;
    }
    
    // Filter by demand
    if (filters.demand !== 'ALL' && property.demand !== filters.demand) {
      return false;
    }
    
    // Filter by property type
    if (filters.propertyType !== 'ALL' && filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }
    
    // Filter by district
    if (filters.district !== 'ALL' && filters.district && property.address.district !== filters.district) {
      return false;
    }
    
    // Filter by bedrooms
    if (filters.bedrooms !== null && property.numberOfBedrooms < filters.bedrooms) {
      return false;
    }
    
    // Filter by bathrooms
    if (filters.bathrooms !== null && property.numberOfBathrooms < filters.bathrooms) {
      return false;
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const minPriceInMillions = filters.priceRange[0] * 1000;
      const maxPriceInMillions = filters.priceRange[1] * 1000;
      if (property.price < minPriceInMillions || property.price > maxPriceInMillions) {
        return false;
      }
    }
    
    // Filter by area range
    if (filters.areaRange) {
      const [minArea, maxArea] = filters.areaRange;
      if (property.area < minArea || property.area > maxArea) {
        return false;
      }
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const titleMatch = property.title.toLowerCase().includes(query);
      const addressMatch = `${property.address.street} ${property.address.ward} ${property.address.district}`.toLowerCase().includes(query);
      const descriptionMatch = property.description.toLowerCase().includes(query);
      
      if (!titleMatch && !addressMatch && !descriptionMatch) {
        return false;
      }
    }
    
    return true;
  });

  // Paginate the filtered data
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return {
    data: {
      ...rawData?.data,
      rowDatas: paginatedData,
      total: filteredData.length
    },
    isLoading,
    error,
    refetch,
    filterOptions: {
      propertyTypes,
      districts
    }
  };
};

export default usePropertyData; 