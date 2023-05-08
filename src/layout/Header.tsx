import { StyleClass } from 'primereact/styleclass';
import { useRef } from 'react';
import iconHome from '../assets/images/icdc.svg';

function Header() {
  const toggleBtnRef = useRef(null);
  return (
    <section id="header">
      <header>
        <nav>
          <div className="grid">
            <div className="col-auto">
              <img className="p-3" src={iconHome} alt="logo" />
            </div>
            <div className="col" />
            <div className="col-auto">
              <StyleClass
                nodeRef={toggleBtnRef}
                selector=".box"
                enterClassName="hidden"
                enterActiveClassName="fadein"
              >
                <i ref={toggleBtnRef} className="pi pi-cog p-4" style={{ fontSize: '3rem' }} />
              </StyleClass>
            </div>
          </div>
        </nav>
      </header>
    </section>
  );
}
export default Header;
