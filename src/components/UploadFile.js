import React, { useEffect, useState } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";


 export const FileUpload = () => {
  const [formData, setFormData] = useState({
    files: null
  });

  const [urls, seUrls] = useState([]);

//   async function createFile(url) {
//     let response = await fetch(url);
//     let data = await response.blob();
//     let metadata = {
//       type: data.type
//     };
//     let file = new File([data], "test.jpg", metadata);
//     return file;
//   }

  const onSubmit = async () => {
    //Pay attention that form data files is array !!
    console.log(formData);
  };

//   const onSubmit1 = async () => {
//     //you can use the
//     // const url = URL.createObjectURL(formData.applicantPhoto[0]);
//     // const test = createFile(url);
//     const data = await createFile(urls[0]);
//     console.log(data);
//   };

  useEffect(() => {
    if (formData?.files?.length > 0) {
      seUrls(formData.files.map((f) => URL.createObjectURL(f)));
      console.log('urlSet')
    }
  }, [formData.files]);

  return (
    <div>
      <FilePond
        files={formData.files}
        // name="test"
        allowMultiple={false}
        required
        maxFiles={1}
        labelIdle={
          'Drag & Drop your Applicant Photo or <span class="filepond--label-action"> Browse </span>'
        }
        onupdatefiles={(fileItems) => {
          const files = fileItems.map((fileItem) => {
            return fileItem.file;
          });
          setFormData({
            ...formData,
            files
          });
        }}
      />
      <button onClick={() => onSubmit()}>submit using file</button>
      {/* <button onClick={() => onSubmit1()}>submit using URL</button> */}
    </div>
  );
};
