import {imageExtensions} from "@/components/project/TaskView";

export function hasKeyInMap(map: object, key: string): boolean {
  return Object.keys(map).includes(key)
}
