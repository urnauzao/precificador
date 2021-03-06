import Link from 'next/Link';
import { useRouter } from 'next/router';
import styles from '../../styles/components/menu.module.css';

let categories = [
    {label: 'Início', icon: 'pi pi-fw pi-home', link: "/"},
    {label: 'Calculadora', icon: 'pi pi-fw pi-th-large', link: "/calculadora"},
];
     
export default function Menu(){
    const router = useRouter();
    return(    
        // <nav className="u-bg-soft-dark p-multiselect-trigger">
        <nav className={styles.menu}>
            {/* <ul className="p-megamenu" style={{textAlign: 'center'}}> */}
            <ul>
                {
                categories.map(items =>(
                    <li className={styles.layoutMenu} key={"routes_"+items.link}>
                        <Link href={items.link}>
                            { items.link === router.pathname ?
                                <a className={styles.menuAtivo} ><i className={items.icon+" p-mr-2"}></i> {items.label}</a> :
                                <a className={styles.layoutLink}><i className={items.icon+" p-mr-2"}></i> {items.label}</a> 
                            }
                        </Link>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}