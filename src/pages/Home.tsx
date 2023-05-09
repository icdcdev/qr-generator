import { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ColorPicker, ColorPickerChangeEvent } from 'primereact/colorpicker';
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Options,
} from 'qr-code-styling';

function Home() {
  const [format, setFormat] = useState<string>('');
  const [fimage, setFimage] = useState<string | undefined>();
  const imgOptions = [{ name: 'anonymous' }, { name: 'use-credentials' }];
  const dotsTypes = [
    { name: 'rounded' },
    { name: 'dots' },
    { name: 'classy' },
    { name: 'classy-rounded' },
    { name: 'square' },
    { name: 'extra-rounded' },
  ];
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: 'svg' as DrawType,
    data: 'https://www.appsaudi.com.mx',
    image: fimage,
    margin: 0,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
    },
    dotsOptions: {
      color: '#000000',
      type: 'dots' as DotType,
    },
    cornersSquareOptions: {
      color: '#b3f542',
      type: 'extra-rounded' as CornerSquareType,
      gradient: {
        type: 'linear', // 'radial'
        rotation: 180,
        colorStops: [
          { offset: 0, color: '#000000' },
          { offset: 1, color: '#000000' },
        ],
      },
    },
    cornersDotOptions: {
      color: '#222222',
      type: 'dot' as CornerDotType,
      gradient: {
        type: 'linear', // 'radial'
        rotation: 180,
        colorStops: [
          { offset: 0, color: '#000000' },
          { offset: 1, color: '#000000' },
        ],
      },
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      hideBackgroundDots: true,
      crossOrigin: 'anonymous',
      margin: 4,
    },
  });
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    e.preventDefault();
    setOptions({
      ...options,
      [e.target.name]: e.target.value,
    });
  }

  function handleDotOptions(e: DropdownChangeEvent) {
    setOptions((props) => ({
      ...props,
      dotsOptions: { ...options.dotsOptions, [e.target.name]: e.value.name },
    }));
  }

  function handleDotColor(dotColor: string) {
    setOptions((props) => ({
      ...props,
      dotsOptions: { ...options.dotsOptions, color: dotColor },
    }));
  }

  function handleBackgroundColor(dotColor: string) {
    setOptions((props) => ({
      ...props,
      backgroundOptions: { ...options.backgroundOptions, color: dotColor },
    }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFimage(String(reader.result));
      setOptions({
        ...options,
        image: String(reader.result),
      });
    };
    reader.onerror = (error) => {
      return error;
    };
  }

  function onlyNumbers(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key >= '0' && e.key <= '9') {
      return true;
    }
    e.preventDefault();
    return false;
  }

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: 'svg',
    });
  };

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options, fimage]);

  return (
    <div className="p-5">
      <div className="grid flex align-items-center justify-content-center">
        <div className="flex align-items-center justify-content-center col-12 md:col-6 lg:col-6">
          <Card className="shadow">
            <h5 className="m-5">QR Generador</h5>
            <h6 className="col-12 mt-2 mb-0 m-5">General</h6>
            <form className="formgrid grid m-5" onSubmit={onDownloadClick}>
              <div className="field col-12">
                <div className="grid">
                  <div className="field col-12">
                    <p>url</p>
                    <InputText
                      id="data"
                      type="text"
                      name="data"
                      className="w-full h-3rem"
                      placeholder="url to generate qr"
                      value={options.data ?? ''}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="field col-4 md:col-4 lg:col-4">
                    <p>width</p>
                    <InputText
                      id="width"
                      type="number"
                      className="mr-1 w-full h-3rem"
                      name="width"
                      placeholder="px"
                      value={String(options.width) ?? ''}
                      onKeyPress={(e) => onlyNumbers(e)}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="field col-4 md:col-4 lg:col-4">
                    <p>height</p>
                    <InputText
                      id="height"
                      type="number"
                      className="mr-1 w-full h-3rem"
                      name="height"
                      placeholder="px"
                      value={String(options.height) ?? ''}
                      onKeyPress={(e) => onlyNumbers(e)}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="field col-4 md:col-4 lg:col-4">
                    <p>Margin</p>
                    <InputText
                      id="margin"
                      type="number"
                      className="mr-1 w-full h-3rem"
                      name="margin"
                      placeholder="px"
                      value={String(options.margin) ?? ''}
                      onKeyPress={(e) => onlyNumbers(e)}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <h6 className="field col-12">Dots options</h6>
                  <div className="field col-4 md:col-4 lg:col-4">
                    <p>Color</p>
                    <ColorPicker
                      value={options.dotsOptions?.color ?? ''}
                      onChange={(e: ColorPickerChangeEvent) =>
                        handleDotColor(`#${String(e.value)}`)
                      }
                    />
                  </div>
                  <div className="field col-4 md:col-4 lg:col-4">
                    <p>Hexagecimal</p>
                    <InputText
                      id="margin"
                      type="text"
                      className="mr-1 w-full h-3rem"
                      name="margin"
                      placeholder="#FFFFFF"
                      value={options.dotsOptions?.color ?? ''}
                      onChange={(e) => handleDotColor(e.target.value)}
                    />
                  </div>
                  <div className="field col-4 md:col-4 lg:col-4">
                    <p>Type</p>
                    <Dropdown
                      name="type"
                      className="col-12 h-3rem"
                      optionLabel="name"
                      placeholder=""
                      value={{ name: options.dotsOptions?.type }}
                      options={dotsTypes}
                      onChange={(e: DropdownChangeEvent) => handleDotOptions(e)}
                    />
                  </div>
                </div>
                <div className="grid">
                  <h6 className="field col-12">Background options</h6>
                  <div className="field col-6 md:col-6 lg:col-3">
                    <p>Color</p>
                    <ColorPicker
                      value={options.backgroundOptions?.color ?? ''}
                      onChange={(e: ColorPickerChangeEvent) =>
                        handleBackgroundColor(`#${String(e.value)}`)
                      }
                    />
                  </div>
                  <div className="field col-6 md:col-6 lg:col-3">
                    <p>Hexagecimal</p>
                    <InputText
                      id="margin"
                      type="text"
                      className="mr-1 w-full h-3rem"
                      name="margin"
                      placeholder="#FFFFFF"
                      value={options.backgroundOptions?.color ?? ''}
                      onChange={(e) => handleBackgroundColor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid">
                  <h6 className="field col-12">Image options</h6>
                  <div className="filed col-12 md:col-12 lg:col-6">
                    <p>Select image</p>
                    <InputText
                      type="file"
                      className="mr-1 w-full h-3rem"
                      onChange={(e) => handleImage(e)}
                    />
                  </div>
                  <div className="field col-6 md:col-6 lg:col-3">
                    <p>crossOrigin</p>
                    <Dropdown
                      className="col-12 h-3rem"
                      optionLabel="name"
                      placeholder="Select format"
                      value={format}
                      options={imgOptions}
                      onChange={(e: DropdownChangeEvent) => setFormat(e.value.name)}
                    />
                  </div>
                  <div className="field col-6 md:col-6 lg:col-3">
                    <p>Margin</p>
                    <InputText
                      id="margin"
                      type="number"
                      className="mr-1 w-full h-3rem"
                      name="margin"
                      placeholder="margin"
                      value={String(options.margin) ?? ''}
                      onKeyPress={(e) => onlyNumbers(e)}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
        <div className="flex align-items-center justify-content-center col-12 md:col-6 lg:col-4">
          <div className="phone-container justify-content-center">
            <div className="qr flex align-items-center justify-content-center mt-8 " ref={ref} />
            <div className="col-12 p-8">
              <Button className="col-12" onClick={onDownloadClick}>
                Generar SVG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
