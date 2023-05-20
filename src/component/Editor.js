import { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, updateDoc, onSnapshot} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Font = Quill.import('formats/font');
Font.whitelist = ['Arial', 'Times New Roman', 'Verdana'];
Quill.register(Font, true);

const modules = {
    toolbar: [
    [{ 'undo': true, 'redo': true }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'code-block': 'code' }],
      ['link', 'image'],
      ['clean'],
      ['video'],
    ]
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'video',
    'list', 'bullet',
    'indent',
    'code-block',
    'color', 'background',
    'link', 'image',
    'size',
    'font',
  ];


export default function Editor({
database}){
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [editorData, setEditorData] = useState('');
    let databaseCollection = collection(database, 'docs-data');
    let params = useParams();

    const getEditorData =(value) =>{
      setEditorData(value);
    }

    useEffect(() =>{
        const updateDocument = setTimeout(() => {
            let docToUpdate = doc(databaseCollection, params.id)

            updateDoc(docToUpdate, {
                body: editorData
            })
            .then(() => {
                toast.success("Document Updated", {
                    autoClose:1000
                });      
            })
            .catch(()=>{
                toast.error("Can't Update Document")
            });
        }, 2000);


        return () => clearTimeout(updateDocument)
    }, [editorData])


    useEffect(() =>{
        const document = doc(databaseCollection, params.id)
        onSnapshot(document, (docs) =>{
            setTitle(docs.data().title)
            setEditorData(docs.data().body);
        })
    }, []);

  return(
    <div>
    <div>
    <button className='goback-btn' onClick={()=> navigate('/home')}>Back</button>
    </div>
    <ToastContainer />
    <h3 className=''>Document Name : <span> {title}</span></h3>
    <div className='data'> 
    <ReactQuill value={editorData} onChange={getEditorData}  modules={modules}
    formats={formats}/>
    </div>
  
    </div>
  )
}
