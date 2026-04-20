type Vector3Like = { x: number; y: number; z: number; };

type Color3Like = { r: number; g: number; b: number; };

function isVector3(obj: any): obj is Vector3Like {
    return obj && typeof obj.x === 'number' && typeof obj.y === 'number' && typeof obj.z === 'number';
}

function isColor3(obj: any): obj is Color3Like {
    return obj && typeof obj.r === 'number' && typeof obj.g === 'number' && typeof obj.b === 'number';
}

function lerp(start: number, end: number, delta: number): number {
    return start + (end - start) * delta;
}

function formatColor(color: Color3Like): string {
    return `rgb(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)})`;
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

export { isVector3, isColor3, lerp, formatColor, clamp };