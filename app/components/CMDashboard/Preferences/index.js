import React from "react";
import { Modal, Button } from "antd";
import styles from "./Preferences.module.scss";
class Preference extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    return (
      <>
        <div
          className={styles.title_preference}
          onClick={() => this.setModal1Visible(true)}
        >
          Change Display Data Preference
        </div>
        <Modal
          title="20px to Top"
          style={{ top: 20, right: 10 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </>
    );
  }
}

export default Preference;
