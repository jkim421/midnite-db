import React from 'react'
import _ from 'lodash';

import '../../styles/filters.css';

const FiltersCheckbox = ({ title, filterData }) => {
  return (
    <>
      <h5 className="filter-group">{title}</h5>
      {
        filterData.map(({ value, alias = null }, idx) => {
          const id = `${_.kebabCase(title)}_filter_${_.kebabCase(value)}_checkbox`
          const label = alias || value

          const isLastCheckbox = idx === filterData.length - 1

          let containerClasses = "filter-checkbox-container"
          if (isLastCheckbox) {
            containerClasses = containerClasses.concat(' filter-checkbox-last')
          }

          return (
            <div className={containerClasses}>
              <input
                id={id}
                type="checkbox"
              />
              <label
                for={id}
                className="filter-checkbox-label"
              >
                {label}
              </label>
            </div>
          )
        }
      )}
    </>
  )
}

export default FiltersCheckbox
