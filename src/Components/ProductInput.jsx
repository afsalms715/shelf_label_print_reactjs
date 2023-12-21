import {useState,useEffect} from 'react'
import { jsPDF } from "jspdf";
import './Styles/ProductInput.css'
import { propTypes } from 'react-bootstrap/esm/Image';

const ProductInput = () => {
    const [loc,setLoc]=useState(701);
    const [barcode,setBarcode]=useState("");
    const [sudesc,setSudesc]=useState("");
    const [sudescAr,setSudescAr]=useState("");
    const[rsp,setRsp]=useState("")
    const[rspAr,setRspAr]=useState('')
    const[intRsp,setIntRsp]=useState("")
    const[floatRsp,setFloatRsp]=useState('')
    const [products,setProducts]=useState([])
    const [pdfData, setPdfData] = useState(null);
    const [loading,setLoading]=useState(false)
    const getProductDtl= (e)=>{
        setSudesc("Loading...")
        fetch(`http://192.168.51.26:8087/api/ProductDtl/product?barcode=${barcode}&loc=${loc}`).then(resp=>resp.json()).then(resp=>{
            console.log(resp)
            if(resp.status){
                setSudesc("Not Found")
            }else{
                setSudesc(resp.su_desc)
                setSudescAr(resp.su_desc_ar) 
                setRsp(resp.price)
                setRspAr(numberToArabic(parseFloat(resp.price)))         
            }
        })
    }

    useEffect(()=>{
        if(barcode!='' && barcode.length>=4){
            getProductDtl() 
        }else{
            setSudesc("Not Found") 
        }    
    },[barcode])

    useEffect(()=>{
        if(sudesc=='Not Found'){
            document.getElementById("sudesc").style.border="1px solid red"
        }else{
            document.getElementById("sudesc").style.border=""
        }
    },[sudesc])

    const addProducts=()=>{
        if(products.length<6){
            if(sudesc!='' && sudesc!='Not Found' && sudesc!="Loading..."){
                //products.push({"barcode":barcode,"suDesc":sudesc,"sudescAr":sudescAr,"rsp":rsp})
                setProducts([...products,{"barcode":barcode,"suDesc":sudesc.replace(/&/g, ''),"sudescAr":sudescAr,"rsp":rsp,"rspIntEn":intRsp,"rspFloatEn":floatRsp,"rspIntAr":numberToArabic(intRsp),"rspFloatAr":numberToArabic(floatRsp)}])
                setBarcode('')
                setSudesc('')
                setRsp('')
                console.log(products)

            }
        }else{
            alert("Maximum 6 Products")
        }
    }

    const removeProducts=(indx)=>{
        setProducts(products.filter((item,index)=>index!=indx))
    }

    const numberToArabic=(number)=>{
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        console.log(number)
        console.log(typeof number)
        if (typeof number !== 'number') {
            return 'Invalid input';
        }
        
        const numericString = String(number);
        let arabicString = '';
        
        for (let i = 0; i < numericString.length; i++) {
            const digit = numericString.charAt(i);
            if (isNaN(digit)) {
                arabicString += digit;
            } else {
                arabicString += arabicNumerals[parseInt(digit)];
            }
        }
        
        return arabicString;
    }

    const generatePdf= async ()=>{
        if(products.length!=0){
        try{
            //const response = await fetch(`http://192.168.51.26:8084/generate-pdf?products=${JSON.stringify(products)}`);//production
            const response = await fetch(`http://localhost:3002/generate-pdf?products=${JSON.stringify(products)}`);//testing
        const pdfBlob = await response.blob();
        setPdfData(pdfBlob);
        }
        catch (error) {
            console.error('Error fetching PDF:', error);
          }
        }
    }

  return (
    <div className='ms-auto me-auto container'>
        <div className='row p-md-3'>
            <div className='col-md-2'>
                <label>Location</label>
                <select className='form-select form-select-sm' onChange={(e)=>setLoc(e.target.value)}>
                    <option value="701">Grand Mall</option>
                    <option value="702">Ezdan</option>
                    <option value="703">Plaza 2</option>
                    <option value="704">Plaza 3</option>
                    <option value="705">Shahaniya</option>
                    <option value="706">Barwa</option>
                    <option value="707">Aziziya</option>
                    <option value="708">Umm Garn</option>
                </select>
            </div>
            <div className='col-md-3'>
                <label>Barcode</label>
                <input type='number' placeholder='barcode' value={barcode} className='form-control form-control-sm ' onChange={(e)=>setBarcode(e.target.value)} />
            </div>
            <div className='col-md-5'>
                <label>Su Description</label>
                <input type='text' id='sudesc' placeholder='su description' className='form-control form-control-sm ' value={sudesc} readOnly/>
            </div>
            <button className='btn btn-primary btn-sm col-md-2' style={{height:"30px",marginTop:"23px"}} onClick={addProducts}>ADD</button>
        </div>
        <div className='row p-md-3'>
            <div className='col'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Barcode</th>
                            <th scope="col">Su Description</th>
                            <th scope="col">Su Description Arabic</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((resp,index)=>
                            <tr key={index}>
                                <td>{resp.barcode}</td>
                                <td>{resp.suDesc}</td>
                                <td>{resp.sudescAr}</td>
                                <td>{resp.rsp}</td>
                                <td><button className='btn btn-sm btn-danger' onClick={()=>removeProducts(index)}>Remove</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        <div className='row'>
            {pdfData && (
                <embed src={URL.createObjectURL(pdfData)} type="application/pdf" width="100%" height="800px" />
            )}
        </div>
        <div className='row p-md-3'>
            {loading?(<div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>):
                (<button className='btn btn-success btn-sm col w-100' onClick={generatePdf}>Generate PDF</button>)
            }
        </div>
    </div>
  )
}

export default ProductInput