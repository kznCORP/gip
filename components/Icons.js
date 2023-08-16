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

export const Icons = ({ iconName }) => {
  switch (iconName) {
    case "beef":
      return <Beef color="white" />;
    case "bike":
      return <Bike color="white" />;
    case "bus":
      return <Bus color="white" />;
    case "camera":
      return <Camera color="white" />;
    case "car":
      return <Car color="white" />;
    case "circle-dollar-sign":
      return <CircleDollarSign color="white" />;
    case "egg-fried":
      return <EggFried color="white" />;
    case "heart-pulse":
      return <HeartPulse color="white" />;
    case "home":
      return <Home color="white" />;
    case "landmark":
      return <Landmark color="white" />;
    case "moon":
      return <Moon color="white" />;
    case "mountain":
      return <Mountain color="white" />;
    case "heart":
      return <Heart color="white" />;
    case "palmtree":
      return <Palmtree color="white" />;
    case "pill":
      return <Pill color="white" />;
    case "pizza":
      return <Pizza color="white" />;
    case "plane":
      return <Plane color="white" />;
    case "sailboat":
      return <Sailboat color="white" />;
    case "shirt":
      return <Shirt color="white" />;
    case "shopping-bag":
      return <ShoppingBag color="white" />;
    case "snowflake":
      return <Snowflake color="white" />;
    case "soup":
      return <Soup color="white" />;
    case "sparkles":
      return <Sparkles color="white" />;
    case "sticky-note":
      return <StickyNote color="white" />;
    case "sun":
      return <Sun color="white" />;
    case "tag":
      return <Tag color="white" />;
    case "train":
      return <Train color="white" />;
    case "utensils":
      return <Utensils color="white" />;
    case "volume-2":
      return <Volume2 color="white" />;
    case "wallet":
      return <Wallet color="white" />;
    case "zap":
      return <Zap color="white" />;
    default:
      return null;
  }
};
