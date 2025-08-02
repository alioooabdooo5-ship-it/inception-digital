
import React from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  illustration?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  link,
  illustration
}) => {
  return (
    <div className="glass-card h-full p-6 card-hover flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-inception-purple bg-opacity-10 flex items-center justify-center text-inception-purple">
          {icon}
        </div>
        {illustration && (
          <div className="w-20 h-20 overflow-hidden">
            <img 
              src={illustration} 
              alt={title} 
              className="w-full h-full object-contain animate-float"
            />
          </div>
        )}
      </div>
      <h3 className="title-medium text-inception-purple mb-2">{title}</h3>
      <p className="body-medium text-gray-600 flex-grow mb-4">{description}</p>
      <Link
        to={link}
        className="group flex items-center text-inception-purple hover:text-inception-orange transition-all duration-300 hover:translate-x-1"
      >
        <span className="font-medium">اقرأ المزيد</span>
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
        />
      </Link>
    </div>
  );
};

export default ServiceCard;
