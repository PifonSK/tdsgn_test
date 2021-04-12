import React, {useContext} from 'react'
import TreeBranch from './TreeBranch'
import Context from '../context'
import TreeContext from '../TreeContext'

export default function Tree({branches}) {
    const {setBranches} = useContext(Context)
    const [jsonBranches, setJsonBranches] = React.useState(JSON.stringify(branches, undefined, 4));
    const [showJson, setShowJson] = React.useState(false);

    function parseBranches(branches) {
        return branches.map((branch, index) => 
            <TreeBranch 
                key={index} 
                branch={branch} 
                childrens={branches} 
            />
        );
    }

    React.useEffect(() => {
		setJsonBranches(JSON.stringify(branches, undefined, 4));
	}, [branches]);

    function handleChange(e) {
		setJsonBranches(e.target.value);
	}

    function changeFormat() {
		if (showJson) {
			try {
				setBranches(JSON.parse(jsonBranches));
				setShowJson(false);
			} catch(e) {
				console.error(e);
				alert('Некорректный JSON, проверьте консоль');
			}
		} else {
			setShowJson(true);
		}
	}

    return (
        <TreeContext.Provider value={{parseBranches}}>
            <div className={`code ${showJson ? '_active' : ''}`} onClick={changeFormat} title={showJson ? 'Показать дерево' : 'Показать JSON'}>JSON</div>
            <ul className={`main__tree ${showJson ? 'close' : ''}`}>
                {parseBranches(branches)}
            </ul>
            <textarea className={!showJson ? 'close' : ''} value={jsonBranches} onChange={handleChange}></textarea>
        </TreeContext.Provider>
    )
}