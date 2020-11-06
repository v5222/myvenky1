import React from 'react'
const { Option } = Select;
import { Select } from 'antd';
import { Radio } from 'antd';
import styles from "./bidteam.module.scss"
import { Input } from 'antd';

function BidTeam() {
    return (
        <div className={styles.container}>
            <div className={styles.flex_col}>
                <div>
                    1.Cost inflation-Rental
                 </div>
                 <div>
                 <Input placeholder="Basic usage" />
                </div>
             </div>

             <div className={styles.flex_col}>
                <div>
                    2.Cost inflation-ManPower
                 </div>
                 <div>
                 <Input placeholder="Basic usage" />
                </div>
             </div>


             <div className={styles.flex_col}>
                <div>
                    3.Cost inflation-Rental
                 </div>
                 <div>
                 <Input placeholder="Basic usage" />
                </div>
             </div>


             <div className={styles.flex_col}>
                <div>
                    4.Cost inflation-Capex
                 </div>
                 <div>
                 <Input placeholder="Basic usage" />
                </div>
             </div>

             <div className={styles.flex_col}>
                <div>
                5.Cost inflation-Maintainance
                 </div>
                 <div>
                 <Input placeholder="Basic usage" />
                </div>
             </div>

             <div className={styles.flex_col}>
                <div>
                    6.Intrest Rate
                 </div>
                 <div>
                 <Input placeholder="Basic usage" />
                </div>
             </div>
             <div className={styles.flex_col}>
                <div>
                    7.WACC
                 </div>
                 <div>
                 <Input placeholder="Basic usage" />
                </div>
             </div>
        </div>
    )
}

export default BidTeam
