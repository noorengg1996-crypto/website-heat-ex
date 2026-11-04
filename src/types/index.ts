export interface EquipmentItem {
  id: string;
  name: string;
  tagline: string;
  category: 'heat-exchangers' | 'stator-coolers' | 'bearings' | 'retubing' | 'machining';
  naturalPhoto: string;
  brochurePhoto: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  metallurgy: string[];
  designStandards: string[];
  applications: string[];
  highlights: string[];
}

export interface ClientEntity {
  name: string;
  subtitle: string;
  category: string;
  badge: string;
  description: string;
}

export interface GalleryMediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  category: 'all' | 'stator-coolers' | 'shell-and-tube' | 'bearings' | 'retubing' | 'shopfloor' | 'brochure';
  url: string;
  thumbnail?: string;
  description: string;
  specs?: string;
  uploadedByUser?: boolean;
  dateAdded?: string;
}

export interface InquiryFormData {
  equipmentType: string;
  serviceType: string;
  industry: string;
  tubeMetallurgy: string;
  shellFluid: string;
  tubeFluid: string;
  operatingPressureBar: string;
  operatingTempC: string;
  tubeLength: string;
  totalExchangerLength: string;
  shellDiaType: 'ID' | 'OD';
  shellDiameter: string;
  tubeDiameter: string;
  otherDimensions: string;
  urgency: 'standard' | 'priority' | 'emergency-outage';
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  additionalDetails: string;
  estimatedQuantity: string;
  drawingFileName?: string;
  drawingFileSize?: string;
  drawingFileData?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  content: string;
  timestamp: string;
}
