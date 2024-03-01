import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { Switch } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
//// sm:flex gap-4

export default function Navbar_(props) {
  function toggle(){
    props.toggle.setdark(!props.toggle.dark);
  }
  const language = [
    {label: "C++", value: "cpp"},
    {label: "Python", value: "python"},
    {label: "JS", value: "javascript"},]

    return (
    <Navbar className={props.toggle.dark? "dark": ""} isBordered>
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
        <NavbarItem className={props.question? "":"hidden"}>
                    <Select
                        placeholder="Language"
                        className="w-[110px]"
                        radius='full'
                        size=""
                        onChange={(e)=>props.language.setlang(e.target.value)}
                        >
                        {language.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </Select>
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
        <NavbarItem className="lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
