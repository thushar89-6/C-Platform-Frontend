import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { Switch } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
//// sm:flex gap-4

export default function Navbar_(props) {


  function toggle() {
    props.toggle.setdark(!props.toggle.dark);
  }
  const language = [
    { label: "C++", value: "cpp", },
    { label: "Python", value: "python", },
    { label: "JS", value: "javascript", },]

  const setcomment = (e) => {
    switch (e) {
      case "cpp": props.setcom("//Write your code here."); break;
      case "python": props.setcom("#Write your code here"); break;
      case "javascript": props.setcom("//Write your code here."); break;
    }
  }



  return (
    <Navbar className={props.toggle.dark ? "dark" : ""} isBordered>
      <NavbarBrand>
        <img src="Logo.png" height="36px" width="36px" ></img>
        <p className="font-bold text-inherit px-2">C-Platform</p>
      </NavbarBrand>
      <NavbarContent className="hidden" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className={props.question ? "" : "hidden"}>
          <Select
            placeholder="Language"
            className="w-[110px]"
            radius='full'
            size=""
            onChange={(e) => {
              props.setlang(e.target.value)
              setcomment(e.target.value);
            }
            }>
            {language.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>
        </NavbarItem>

        <NavbarItem  className={props.loggedin?"":"hidden"}>
          <Button as={Link}  color="primary" variant="flat" href="/">
            {props.session && props.session.email}
          </Button>
        </NavbarItem>

        <NavbarItem  className={props.loggedin?"":"hidden"}>
          <Button as={Link}  color="primary" variant="flat" href="/">
            Rating: {props.session && props.session.points}
          </Button>
        </NavbarItem>

        <NavbarItem  className={!props.loggedin?"":"hidden"}>
          <Button as={Link} color="primary" variant="flat" href="/login">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className={props.loggedin?"":"hidden"}>
          <Button as={Link} color="primary" href="/logout" variant="flat">
            Logout
          </Button>
        </NavbarItem>

        <NavbarItem className={!props.loggedin?"":"hidden"}>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>



        <NavbarItem>
          <Switch
            onValueChange={toggle}
            size="md"
            color="default"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
          >
          </Switch>

        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
