import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '../components/ProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Grid, List, Loader2, ListIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const fetchProjects = async () => {
  const response = await fetch('https://bemodernestate.site/api/v1/projects?page_current=1&page_size=10');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const data = await response.json();
  return data.data;
};

const ProjectListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 15000000000]);
  const [viewMode, setViewMode] = useState('grid');

  // Use React Query to fetch data
  const { data: projectsData, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const filteredProjects = useMemo(() => {
    if (!projectsData?.rowDatas) return [];
    
    return projectsData.rowDatas.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || project.typeProject === selectedType;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesPrice = project.priceMin >= priceRange[0] && project.priceMax <= priceRange[1];
      
      return matchesSearch && matchesType && matchesStatus && matchesPrice;
    });
  }, [searchTerm, selectedType, selectedStatus, priceRange, projectsData]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600">Không thể tải dữ liệu dự án. Vui lòng thử lại sau.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
            <h1 style={{fontSize: '24px', fontWeight: 'bold', color: '#4A90E2', marginTop: '10px'}} className="text-3xl font-bold text-gray-900">
            DANH SÁCH DỰ ÁN
              </h1>
              <p className="text-gray-600 mt-1">Khám phá các dự án căn hộ hàng đầu</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-blue-200 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <ProjectFilters
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Đang tải dự án...
                    </div>
                  ) : (
                    `Tìm thấy ${filteredProjects.length} dự án`
                  )}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Hiển thị các dự án phù hợp với tiêu chí của bạn
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'border-gray-300 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  )}
                  onClick={() => setViewMode('grid')}
                  style={{cursor: 'pointer'}}
                >
                  <Grid className="h-4 w-4" style={{ color: viewMode === 'grid' ? 'white' : 'black' }} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'border-gray-300 transition-colors',
                    viewMode === 'list'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  )}
                  onClick={() => setViewMode('list')}
                  style={{cursor: 'pointer'}}
                >
                  <ListIcon className="h-4 w-4" style={{ color: viewMode === 'list' ? 'white' : 'black' }} />
                </Button>
              </div>
            </div>

            {/* Projects Grid/List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy dự án nào
                </h3>
                <p className="text-gray-600">
                  Hãy thử điều chỉnh bộ lọc để tìm thấy nhiều kết quả hơn
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListing;
