import { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
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

function QrModalConfig() {
  const [dcolor, setDcolor] = useState<string>('');
  const [bcolor, setBcolor] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [visible, setVisible] = useState(false);
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
      mode: 'Byte' as Mode,
      errorCorrectionLevel: 'Q' as ErrorCorrectionLevel,
    },
    dotsOptions: {
      color: '#000000',
      type: 'dots' as DotType,
    },
    cornersSquareOptions: {
      color: '#222222',
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
    console.log(e);
    setOptions((props) => ({
      ...props,
      dotsOptions: { ...options.dotsOptions, [e.target.name]: e.value.name },
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
      console.log('Error: ', error);
    };
  }

  function onlyNumbers(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key >= '0' && e.key <= '9') {
      return true;
    }
    e.preventDefault();
    return false;
  }

  function onDownloadClick() {
    if (!qrCode) return;
    qrCode.download({
      extension: 'svg',
    });
  }

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    console.log(options);
    qrCode.update(options);
  }, [qrCode, options, fimage]);

  return (
    <div className="card flex justify-content-center">
      <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
      <Dialog
        header="Header"
        visible={visible}
        maximizable
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </Dialog>
    </div>
  );
}

export default QrModalConfig;
