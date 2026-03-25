import type { LucideProps } from 'lucide-react'
import {
  // Common UI
  Circle, Star, Zap, Shield, Heart, Check, CheckCircle, Info,
  // Business / services
  Briefcase, Clock, Phone, Mail, MapPin, Globe, Users, Award,
  Building, Store, Home, Wrench, Settings,
  // Media
  Camera, Image, Video, Music, Play,
  // Finance / commerce
  CreditCard, DollarSign, Tag, ShoppingCart, ShoppingBag, Package,
  // Health / fitness
  Activity, Dumbbell, Bike,
  // Misc
  Flame, Leaf, Sparkles, ThumbsUp, MessageCircle,
  BookOpen, GraduationCap, Calendar, Bell,
} from 'lucide-react'
import type { ComponentType } from 'react'

const ICON_MAP: Record<string, ComponentType<LucideProps>> = {
  Circle, Star, Zap, Shield, Heart, Check, CheckCircle, Info,
  Briefcase, Clock, Phone, Mail, MapPin, Globe, Users, Award,
  Building, Store, Home, Wrench, Settings,
  Camera, Image, Video, Music, Play,
  CreditCard, DollarSign, Tag, ShoppingCart, ShoppingBag, Package,
  Activity, Dumbbell, Bike,
  Flame, Leaf, Sparkles, ThumbsUp, MessageCircle,
  BookOpen, GraduationCap, Calendar, Bell,
}

/**
 * Returns a Lucide icon component by its PascalCase name string.
 * Falls back to Circle when the name is not in the curated map.
 * To add more icons, import them above and add to ICON_MAP.
 */
export function getLucideIcon(name: string): ComponentType<LucideProps> {
  return ICON_MAP[name] ?? Circle
}
