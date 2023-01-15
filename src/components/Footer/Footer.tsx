import React from 'react';
import cn from "classnames";
import s from "./Footer.module.scss";
import {InstaFooterIcon} from "../ui/icons/InstaFooterIcon";
import {TelegramFooterIcon} from "../ui/icons/TelegramFooterIcon";
import {Link} from "react-router-dom";
import {footerBlocks} from "../../data/data";

export const Footer = ():JSX.Element => {
  return (
    <footer className={cn('container', s.footer)}>
      {footerBlocks.map((item) => (
          <div className={s.footerBlock} key={item.id}>
            <h5 className={cn('h5', s.title)}>{item.title}</h5>
            <ul className={s.footerList}>
              {item.links.map((link) => (
                  <li className={s.footerListItem}>
                    <Link to={link.link} className={s.footerText}>{link.title}</Link>
                  </li>
              ))}
            </ul>
          </div>
      ))}
      <div className={s.footerBlock}>
        <h5 className={cn('h5', s.title)}>Контакты</h5>
        <div className={s.socialMedias}>
          <InstaFooterIcon className={s.icon} />
          <TelegramFooterIcon className={s.icon} />
        </div>
        <a className={cn(s.footerListItem, s.footerText)} href="tel: +380730963644">+38(073) 096 36 44</a>
        <a className={cn(s.footerListItem, s.footerText)} href="mailto: info@yanki.com">info@yanki.com</a>
      </div>
    </footer>
  );
};