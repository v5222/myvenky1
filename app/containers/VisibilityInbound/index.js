import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import ErrorBoundary from "components/ErrorBoundary";
import styles from "./visibilityInbound.module.scss";
import VIFORM from "components/VisibilityInbound/Home/Inbound";

const VisibilityInbound =({logout,user})=>{
    return(
        <ErrorBoundary logout={logout} user={user}>
        <MainLayout logout={logout} user={user}>
        <main className={styles.container}>
        <h3 className={styles.sititle}>
          InBound</h3>
          <hr className={styles.sihr}></hr>
        <div className={styles.sicontent}>
        <VIFORM></VIFORM>
        </div>
        </main>
        </MainLayout>
    </ErrorBoundary>
  );
}

export default VisibilityInbound;