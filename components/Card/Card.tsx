import React, { ReactNode } from "react";
import cx from 'classnames';
import Link from "next/link";

interface CardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    color?: "blue" | "yellow" | "green" | "purple" | "pink" | "black" | string;
    icon?: string;
    href?: string;
    onClick?: Function
}

const Card: React.FC<CardProps> = ({ children, title, subtitle, color = "blue", icon, href = "" }) => {
    return (
        <Link href={href} className={cx(`card ${color} p-4 pt-0`)}>
            {title && <h2 className="text-2xl self-start font-bold uppercase">{title}</h2>}
            {subtitle && <h2 className="text-sm font-bold self-start">{subtitle}</h2>}
            <div className="overlay"></div>
            <div className="circle mb-4">
                <img src={icon} width="64px" height="72px" />
            </div>
            {children}
        </Link>
    );
};

export default Card;