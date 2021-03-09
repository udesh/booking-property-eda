import styles from './index.css';
import MDayPicker from '../components/MDayPicker';
import { Link } from 'umi';
export default function () {
  return (
    <div className={styles.normal}>
      <MDayPicker></MDayPicker>
      <Link to="/properties">Select dates and go to Properties</Link>
    </div>
  );
}
