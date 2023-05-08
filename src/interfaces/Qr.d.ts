export interface Qrinfo {
  width: string;
  height: string;
  type: string;
  data: string;
  image: string;
  dotColor: string;
  dotType: string;
  backgroudColor: string;
  crossOrigin: string;
  margin: string;
}

export interface QrConfiguration {
  width: number | undefined;
  height: number | undefined;
  type: string | undefined;
  data: string | undefined;
  image: string | undefined;
  dotsOptions: {
    color: string | undefined;
    type: string | undefined;
  };
  backgroundOptions: {
    color: string | undefined;
  };
  imageOptions: {
    crossOrigin: string | undefined;
    margin: number | undefined;
  };
}
