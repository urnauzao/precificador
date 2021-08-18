// import Link from 'next/Link';
import { useRouter } from 'next/router';
import styles from '../../styles/components/menu.module.css';

let categories = [
    { label: 'Início', icon: 'pi pi-fw pi-home', link: "/" },
    { label: 'Calculadora', icon: 'pi pi-fw pi-th-large', link: "/calculadora" },
    { label: 'Peso Cubado', icon: 'pi pi-fw pi-th-large', link: "/cubagem" },
    { label: 'Frete Ponderado', icon: 'pi pi-fw pi-th-large', link: "/frete-ponderado" },
];

export default function Menu() {
    const router = useRouter();
    return (
        <nav className={styles.menu}>
            <ul>
                {
                    categories.map(items => (
                        <li className={styles.layoutMenu} key={"routes_" + items.link}>
                            {items.link === router.pathname ?
                                <a href={items.link} className={items.link === router.pathname ? styles.menuAtivo : styles.layoutLink} ><i className={items.icon + " p-mr-2"}></i> {items.label}</a> :
                                <a href={items.link} className={styles.layoutLink}><i className={items.icon + " p-mr-2"}></i> {items.label}</a>
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}