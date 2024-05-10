// renderer script that uses document.getElementById DOM API to replace the displayed text for the HTML element with info as
// it id property

const information = document.getElementById("info");
information.innerText = `This app is using Chrome (${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// Call the ping function in renderer process and console.log it
const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

func();
