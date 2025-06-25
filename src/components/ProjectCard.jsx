import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { MapPin, Calendar, Home, Phone, Mail, Eye } from 'lucide-react';

const formatPrice = (price, currency) => {
  if (currency === 'VND') {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ VND`;
    } else if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)} triệu VND`;
    }
    return `${price.toLocaleString()} VND`;
  }
  return `$${(price / 1000000).toFixed(1)}M`;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Đang_Mở_Bán':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Sắp_Mở_Bán':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Đang_Xây_Dựng':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'Chung_Cư':
      return 'bg-purple-100 text-purple-800';
    case 'Nhà_Biệt_Thự':
      return 'bg-emerald-100 text-emerald-800';
    case 'Nhà_Villa':
      return 'bg-rose-100 text-rose-800';
    case 'Đất_Nền':
      return 'bg-amber-100 text-amber-800';
    case 'Nhà_Ở':
      return 'bg-cyan-100 text-cyan-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ProjectCard = ({ project, viewMode }) => {
  const fullAddress = `${project.address.houseNumber} ${project.address.street}, ${project.address.ward}, ${project.address.district}, ${project.address.city}`;

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 h-48 md:h-auto relative overflow-hidden">
            <img
              src={project.images[0]?.imageUrl || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge style={{ backgroundColor: '#e6f0fa', color: '#4a90e2', borderColor: '#4a90e2' }} className="border">
                {project.status.replace('_', ' ')}
              </Badge>
              <Badge className={getTypeColor(project.typeProject)}>
                {project.typeProject.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className='mb-3'>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {project.title}
              </h3>
              <div className="text-left">
                <p className="text-2xl font-bold text-emerald-600" style={{marginBottom: '0px', color: '#4a90e2'}}>
                  {formatPrice(project.priceMin, project.unitCurrency)}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" style={{ color: '#4a90e2' }} />
                  <span className="line-clamp-1">{fullAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Home className="h-4 w-4" style={{ color: '#4a90e2' }} />
                  <span>Diện tích: {project.projectArea.toLocaleString()} {project.unitArea}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" style={{ color: '#4a90e2' }} />
                  <span>Khởi công: {new Date(project.timeStart).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" style={{ color: '#4a90e2' }} />
                  <span>{project.invetor.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-wrap gap-2 mb-4">
              {project.attribute.slice(0, 3).map((attr, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {attr}
                </Badge>
              ))}
              {project.attribute.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.attribute.length - 3} tiện ích
                </Badge>
              )}
            </div> */}

            <div className="flex gap-3">
              <Button
                style={{ cursor: 'pointer', color: 'white', backgroundColor: '#4a90e2' }}
                className="hover:opacity-90"
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
      <CardHeader className="p-0 relative">
        <div className="h-56 overflow-hidden">
          <img
            src={project.images[0]?.imageUrl || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge style={{ backgroundColor: '#e6f0fa', color: '#4a90e2', borderColor: '#4a90e2' }} className="border">
            {project.status.replace('_', ' ')}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={getTypeColor(project.typeProject)}>
            {project.typeProject.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className='mb-3'>
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {project.title}
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-emerald-600" style={{marginBottom: '0px', color: '#4a90e2'}}>
                {formatPrice(project.priceMin, project.unitCurrency)}
              </p>
              {/* <p className="text-xs text-gray-500">
                - {formatPrice(project.priceMax, project.unitCurrency)}
              </p> */}
            </div>
          </div>
        </div>

        {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description}
        </p> */}

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" style={{ color: '#4a90e2' }} />
            <span className="line-clamp-1">{fullAddress.length > 35 ? fullAddress.substring(0, 35) + '...' : fullAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="h-4 w-4" style={{ color: '#4a90e2' }} />
            <span>Diện tích: {project.projectArea.toLocaleString()} {project.unitArea}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" style={{ color: '#4a90e2' }} />
            <span>Khởi công: {new Date(project.timeStart).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <Button
          style={{ cursor: 'pointer', color: 'white', backgroundColor: '#4a90e2' }}
          className="w-full hover:opacity-90"
        >
          Xem chi tiết
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
