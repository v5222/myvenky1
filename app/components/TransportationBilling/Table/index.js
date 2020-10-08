import React from "react";
import styles from './table.module.scss'

function Table() {
  
  return (
    <>
    <table style={{width:'50%',border:'1px solid black',textAlign:'center',margin:'100px auto'}}>
  <tr className={styles.tablerow}>
    <th className={styles.tableheader}>Over ride value</th>
    <th className={styles.tableheader}>Invoice rule amount</th>
    <th className={styles.tableheader}>Ref Doc No</th>
    <th className={styles.tableheader}>Location</th>
    <th className={styles.tableheader}>Service Item</th>
  </tr>
  <tr className={styles.tablerow}>
    <td className={styles.tabledata}>null</td> 
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
  </tr>
  <tr className={styles.tablerow} >
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
  </tr>
  <tr className={styles.tablerow}>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
  </tr>
  <tr className={styles.tablerow} >
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
    <td className={styles.tabledata}>null</td>
  </tr>
</table>
        
    </>
  );
}

export default Table;
