import React from 'react';
import { MapPin, Bed, Bath, Maximize, Phone, Mail, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button.jsx';
import { cn } from '../lib/utils.js';
import { wardMap, districtMap, cityMap } from '../constants/addressMapping';

const PropertyCard = ({ post, onContactClick }) => {
  const navigate = useNavigate();
  const { property, contact } = post;
  const handleCardClick = () => {
    navigate(`/can-ho/${post.id}`);
  };

  const handleContactAction = (e) => {
    e.stopPropagation();
    onContactClick(contact);
  };

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(1)} tỷ`;
    }
    return `${price} triệu`;
  };

  const formatArea = (area) => {
    return `${area} m²`;
  };

  const getDemandColor = (demand) => {
    return demand === 'MUA_BÁN' ? 'bg-blue-500' : 'bg-green-500';
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      'VIP1': 'bg-yellow-500',
      'VIP2': 'bg-orange-500',
      'VIP3': 'bg-red-500',
      'NORMAL': 'bg-gray-500'
    };
    return colors[priority] || 'bg-gray-500';
  };
  
  const addressParts = [
    property.address?.street,
    wardMap[property.address?.ward] || property.address?.ward,
    districtMap[property.address?.district] || property.address?.district,
    cityMap[property.address?.city] || property.address?.city,
  ].filter(Boolean); // loại bỏ phần rỗng/null

  return (
    <Card 
      className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            {property.propertyImages && property.propertyImages.length > 0 && property.propertyImages[0].imageUrl ? (
              <img 
                src={property.propertyImages[0].imageUrl} 
                alt="Property" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <img 
                src="https://www.lendlease.com/contentassets/302840d3bc9846579cb9f785ed8abb9a/luxury-interior-design.jpg" 
                alt="Default Property" 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${getDemandColor(property.demand)} text-white`}>
            {property.demand === 'MUA_BÁN' ? 'Bán' : 'Thuê'}
          </Badge>
          <Badge className={`${getPriorityBadge(property.priorityStatus)} text-white`}>
            {property.priorityStatus}
          </Badge>
        </div>
        {property.priorityStatus === 'VIP1' && (
          <div className="absolute top-3 right-3">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
          </div>
        )}
      </div>

      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Title & Location Section */}
          <div className="h-17">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {property.title.toUpperCase().length > 20 ? property.title.toUpperCase().slice(0, 20) + '...' : property.title.toUpperCase()}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm truncate">
                {addressParts.join(', ')}
              </span>
            </div>
          </div>

          {/* Price & Info Section */}
          <div className="h-18">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)} VND
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center">
                <Maximize className="h-4 w-4 mr-1" />
                {formatArea(property.area)}
              </div>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                {property.numberOfBedrooms} PN
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                {property.numberOfBathrooms} PT
              </div>
            </div>
          </div>

          {/* Description Section */}
          {/* <div className="h-14">
            <p className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </p>
          </div> */}

          {/* Attributes Section */}
          {/* <div className="h-8">
            {property.attribute && property.attribute.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {property.attribute.slice(0, 3).map((attr, index) => (
                  <Badge key={index} variant="secondary" className="text-xs" style={{ backgroundColor: '#f1f5f9', color: '#000' }}>
                    {attr}
                  </Badge>
                ))}
                {property.attribute.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{property.attribute.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div> */}
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <div className="font-medium">{contact.contactName}</div>
              <div className="flex items-center mt-1">
                <Phone className="h-3 w-3 mr-1" />
                {contact.contactPhone}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                // className="flex items-center gap-1"
                variant="outline"
                  size="sm"
                  className={cn(
                    'border-gray-300 transition-colors',
                    'bg-black text-white hover:bg-gray-800'
                  )}
                  onClick={handleContactAction}
                  style={{cursor: 'pointer', backgroundColor: '#000', color: '#fff'}}
              >
                <Heart className="h-3 w-3" />
              </Button>
              {/* <Button
                size="sm"
                onClick={handleContactAction}
                className="flex items-center gap-1"
                style={{ backgroundColor: '#000', color: '#fff' }}
              >
                <Mail className="h-3 w-3" />
                Liên hệ
              </Button> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard; 