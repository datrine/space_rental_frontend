import { useContext } from "react";
import { ItemTemplate, MySelect } from "../resuables";
import { SearchContext, } from "../searchNfilter";


function Categories() {
    let { params, changeParams } = useContext(SearchContext)
    return <>
        <MySelect labelTitle="Type of Space" valueProps={params.typeOfSpace || "office"}
            selectMenuArr={[
                { value: "residence", text: "Residence" },
                { value: "office", text: "Office" },
            ]} handleChangeProps={
                e => {
                    params.typeOfSpace = e.target.value;
                    changeParams({ ...params });
                }
            } />
    </>
}

export { Categories, }