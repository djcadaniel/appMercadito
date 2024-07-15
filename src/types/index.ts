import React from "react";

export type Category = {
  id: number,
  name: string,
  color: string,
}

export type Activity = {
  id: string,
  category: number,
  name: string,
  precio: number
}