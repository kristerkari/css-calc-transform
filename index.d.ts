interface TransformOptions {
  prop: string;
  value: string;
  win?: {
    width: number;
    height: number;
  };
  parent?: {
    width?: number;
    height?: number;
    font?: {
      size: number;
    };
  };
  font?: {
    size: number;
  };
}

export function transform(options: TransformOptions): number;
