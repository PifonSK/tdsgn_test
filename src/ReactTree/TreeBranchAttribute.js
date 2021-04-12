import React from 'react'

export default function TreeBranchAttribute({branch}) {
    return (
        <div className='attributes'>
			{branch.attributes ? 
				<div className='attributes-wrapper'>
					{branch.attributes.map((attribute, index) => <Property key={index} name={attribute} />)}
				</div>
			: ''}
		</div>
    )
}

function Property({name}) {
	return (
		<div className='attributes-item'>
			{name}
		</div>
	)
}