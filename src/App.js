import React from 'react'
import Tree from './ReactTree/Tree'
import Context from './context'
import AddBranch from './ReactTree/AddBranch'

function App() {
    const [branches, setBranches] = React.useState([
        {
            id: 1,
            title: 'HTML 5',
            open: false,
            active: false,
            attributes: ['attr1', 'attr2', 'attr3'],
        },
        {
            id: 2,
            title: 'CSS 3',
            open: false,
            active: false,
            attributes: ['attr1', 'attr2'],
            children: [
                {
                    id: 8,
                    title: 'SCSS',
                    open: false,
                    active: false,
                    attributes: ['attr1'],
                },
                {
                    id: 9,
                    title: 'Bootstrap',
                    open: false,
                    active: false,
                    attributes: ['attr1'],
                },
            ]
        },
        {
            id: 3,
            title: 'Java Script',
            open: false,
            active: false,
            attributes: ['attr1', 'attr2', 'attr3'],
        },
        {
            id: 4,
            title: 'Frameworks',
            open: false,
            active: false,
            children: [
                {
                    id: 5,
                    title: 'React',
                    open: false,
                    active: false,
                    attributes: ['attr1'],
                    children: [
                        {
                            id: 10,
                            title: 'Next JS',
                            open: false,
                            active: false,
                            attributes: ['attr1'],
                        },
                        {
                            id: 11,
                            title: 'React Native',
                            open: false,
                            active: false,
                            attributes: ['attr1'],
                        },
                    ]
                },
                {
                    id: 6,
                    title: 'Angular',
                    open: false,
                    active: false,
                    attributes: ['attr1'],
                },
                {
                    id: 7,
                    title: 'Vue',
                    open: false,
                    active: false,
                    attributes: ['attr1'],
                }
            ]
        },
    ])

    function recoursiveRemoveBranch(id, items) {
        return items.filter(item => {
            if (item.children) {
                item.children = recoursiveRemoveBranch(id, item.children);
            }
            return item.id !== id;
        });
    }

    function removeBranch(id) {
        setBranches(recoursiveRemoveBranch(id, branches));
    }

    function recoursiveBranch(id, items, method) {
        return items.map(item => {
            if (item.children) {
                item.children = recoursiveBranch(id, item.children, method);
            }
            return method(id, item)
        });
    }

    function activeBranchMethod (id, item) {
        if (item.id === id) {
            item.active = !item.active
        } else {
            item.active = false
        }
        return item
    }

    function activateBranch(id) {
        setBranches(recoursiveBranch(id, branches, activeBranchMethod));
    }

    function openBranchMethod (id, item) {
        if (item.id === id) {
            item.open = !item.open
        }
        return item
    }

    function openBranch(id) {
        setBranches(recoursiveBranch(id, branches, openBranchMethod));
    }

    function updateTree() {
		setBranches(branches.slice());
	}

    function addBranch(title) {
        let activeFlag = false;
        function addBranchMethod (id, item) {
            if (item.active) {
                activeFlag = true;
                if (!item.children) {
                    item.children = []
                }
                item.children.push({
                    id: Date.now(),
                    title,
                    open: false,
                    active: false,
                    children: []
                })  
            }
            return item
        }
        function checkActiveFlag() {
            if (!activeFlag) {
                branches.push({
                    id: Date.now(),
                    title,
                    open: false,
                    active: false,
                    children: []
                })
            }
            return branches
        }
        setBranches(recoursiveBranch(null, branches, addBranchMethod), checkActiveFlag());
        updateTree();
    }

    return (
        <Context.Provider value={{setBranches, removeBranch, activateBranch, openBranch}}>
            <div className='wrapper'>
                <h1>TDSGN ReactTree</h1>
                <AddBranch onCreate={addBranch} />
                {branches.length ? <Tree branches={branches} /> : <p>There is nothing else here</p>}
            </div>
        </Context.Provider>
    );
}

export default App;
