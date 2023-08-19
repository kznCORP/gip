"use client";

import React from "react";
import {
  Beef,
  Bike,
  Bus,
  Camera,
  Car,
  CircleDollarSign,
  EggFried,
  HeartPulse,
  Home,
  Landmark,
  Moon,
  Mountain,
  Heart,
  Palmtree,
  Pill,
  Pizza,
  Plane,
  Sailboat,
  Shirt,
  ShoppingBag,
  Snowflake,
  Soup,
  Sparkles,
  StickyNote,
  Sun,
  Tag,
  Train,
  Utensils,
  Volume2,
  Wallet,
  Zap,
} from "lucide-react";

export const Icons = ({ iconName, iconColor }) => {
  switch (iconName) {
    case "beef":  return <Beef color={iconColor} />;
    case "bike":   return <Bike color={iconColor} />;
    case "bus":  return <Bus color={iconColor} />;
    case "camera":   return <Camera color={iconColor} />;
    case "car":  return <Car color={iconColor} />;
    case "circle-dollar-sign":   return <CircleDollarSign color={iconColor} />;
    case "egg-fried":  return <EggFried color={iconColor} />;
    case "heart-pulse":   return <HeartPulse color={iconColor} />;
    case "home":  return <Home color={iconColor} />;
    case "landmark":   return <Landmark color={iconColor} />;
    case "moon":  return <Moon color={iconColor} />;
    case "mountain":   return <Mountain color={iconColor} />;
    case "heart":  return <Heart color={iconColor} />;
    case "palmtree":   return <Palmtree color={iconColor} />;
    case "pill":  return <Pill color={iconColor} />;
    case "pizza":   return <Pizza color={iconColor} />;
    case "plane":  return <Plane color={iconColor} />;
    case "sailboat":   return <Sailboat color={iconColor} />;
    case "shirt":  return <Shirt color={iconColor} />;
    case "shopping-bag":   return <ShoppingBag color={iconColor} />;
    case "snowflake":  return <Snowflake color={iconColor} />;
    case "soup":   return <Soup color={iconColor} />;
    case "sparkles":  return <Sparkles color={iconColor} />;
    case "sticky-note":   return <StickyNote color={iconColor} />;
    case "sun":  return <Sun color={iconColor} />;
    case "tag":   return <Tag color={iconColor} />;
    case "train":  return <Train color={iconColor} />;
    case "utensils":   return <Utensils color={iconColor} />;
    case "volume-2":  return <Volume2 color={iconColor} />;
    case "wallet":   return <Wallet color={iconColor} />;
    case "zap":  return <Zap color={iconColor} />;
    default:  null;
  }
};
