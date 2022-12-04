import React from "react";
import { Menu } from "antd";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

export function MenuArea() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  function onNavigate(url) {
    navigate(url);
    setIsOpen(false);
  }
  return (
    <div id="menu-area" className={isOpen ? "slide-right" : "slide-left"}>
      {isOpen == true ? (
        <AiOutlineClose
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="menu-btn"
        />
      ) : (
        <AiOutlineMenu
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="menu-btn"
        />
      )}
      <br></br>
      <br></br>
      <Menu>
        <Menu.Item
          onClick={() => {
            onNavigate("/products");
          }}
        >
          Maşınlar
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            onNavigate("/orders");
          }}
        >
          Sifarişlər
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            onNavigate("/customers");
          }}
        >
          Müştərilər
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            onNavigate("/categories");
          }}
        >
          Kateqoriyalar
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            onNavigate("/banners");
          }}
        >
          Bannerlər
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            onNavigate("/requests");
          }}
        >
          İstəklər
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            onNavigate("/settings");
          }}
        >
          Parametrler
        </Menu.Item>
      </Menu>
    </div>
  );
}
