import React, {useContext} from 'react'
import TreeBranchAttribute from './TreeBranchAttribute'
import Context from '../context'
import TreeContext from '../TreeContext'

export default function TreeBranch({branch, childrens}) {
    const {removeBranch, activateBranch, openBranch} = useContext(Context)
    const {parseBranches} = useContext(TreeContext)

    function hasChildren() {
		return branch.children && branch.children.length;
	}

    function TreeTitle() {
        return (
            <li className={`${branch.active ? 'active' : ''}`}>
                <span onClick={() => activateBranch(branch.id)}>
                    <span onClick={() => openBranch(branch.id)} className={`${hasChildren() ? `${branch.open ? 'show' : 'hide'}` : ''}`} />
                    {branch.title}
                </span>
                <TreeBranchAttribute branch={branch} />
                <button className='button__remove' onClick={() => removeBranch(branch.id)}>&times;</button>
            </li>
        )
    }

    return (
        <div>
            {hasChildren() ?
                <React.Fragment>
                    <div className='tree__branch-name'>
                        {TreeTitle()}
                    </div>
                    <div className={`tree__group ${branch.open ? '' : 'close'}`} style={{marginLeft: 20, marginRight: -20}}>
                        {parseBranches(branch.children)}
                    </div>
                </React.Fragment>
                : 
                <div className="tree__branch-name">
                    {TreeTitle()}
                </div>
            }
        </div>
    )
}