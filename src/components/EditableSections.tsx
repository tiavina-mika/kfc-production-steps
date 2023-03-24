const _renderEditableSection = (section, index, isHover, isDeleteHover, error = false, parentSectionGrossWeight) => (
  <Grid
      container
      className={`${isHover ? classes.editHover : ""} ${error || isDeleteHover ? classes.sectionLineError : ""} ${(section.parentId)?classes.sectionInherited:""}`}
      onClick={_stopPropagation}
  >
      <Grid container item xs={5} className={classes.natBorder} alignContent="center">
          <Grid container item xs={12} className={classes.sectionNameEdit} alignItems="center">
              {
                  (isHover && !section.parentId) ?
                      (
                          <>
                              <Grid item xs={10}>
                                  <Autocomplete
                                      freeSolo
                                      disableClearable
                                      className={classes.autocompleteContainer}
                                      inputValue={typeof section.name === "string" ? section.name : section.name.get("name")}
                                      getOptionLabel={(option) => {
                                        return typeof option === "string" ? option : option.get("name")
                                      }}
                                      options={genericSections}
                                      onChange={(event, newInputValue, reason) => {
                                          _onGenericSectionChange(event, newInputValue, index, reason)
                                      }}
                                      onInputChange={(event, newInputValue) => {
                                          _onGenericSectionChange(event, newInputValue, index, "input-change")
                                      }}
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              name={`sections[${index}].name`}
                                              onClick={_stopPropagation}
                                              className={classes.sectionNameWhiteInput}
                                              onFocus={onFieldFocus}
                                              onBlur={onFieldBlur}
                                              onKeyUp={onKeyUp}
                                              onKeyDown={(e) => _onKeyDown(e, section)}
                                              variant="standard"
                                          />
                                      )}
                                  />
                                  <ErrorMessage
                                      name={`sections[${index}].name`}
                                      render={msg => <div className={classes.errorSection}>{msg}</div>}
                                  />
                              </Grid>
                      ) :
                      (
                          <>
                              {
                                  isHover &&
                                  <AddIcon
                                      className={classes.addButtonSection}
                                      onClick={(e) => _addSection(index, e)}
                                  />
                              }
                              <Grid item xs={section.parentId?7:11} className={clsx(classes.sectionText, "center")}>
                                  {
                                      error // Only one field in sections so we can say if line is in error this field is
                                              ?
                                          <ErrorMessage
                                              name={`sections[${index}].name`}
                                              render={msg => <div className={classes.errorSection}>{msg}</div>}
                                          />
                                          :
                                          section.name
                                  }
                                  {
                                      section.parentId &&
                                      <IconButton
                                          className={classes.starIconFilled}
                                          onClick={(event) => {_registerReusable(event, section, index)}}
                                          size="large">
                                          <StarIcon
                                              htmlColor={COLORS.BUTTON_INHERITED}
                                              className="filled"
                                              fontSize="small"
                                          />
                                      </IconButton>
                                  }
                              </Grid>
                          </>
                      )
              }
              {
                  section.parentId &&
                  <Grid item xs={4} className={classes.sectionTextBlock}>
                      <Input
                          id="standard-adornment-weight"
                          name={`sections[${index}].parentPercent`}
                          value={section.parentPercent}
                          onChange={(e) => handlePercentChange(e, index)}
                          className={(isHover)?classes.buttonPercentageInheritedHovered:classes.buttonPercentageInherited}
                          endAdornment={<InputAdornment position="end">%</InputAdornment>}
                          aria-describedby="standard-weight-helper-text"
                          type="number"
                          inputProps={{
                              "aria-label": "weight",
                          }}
                          autoFocus
                      />
                      <span> de {roundNumber(parentSectionGrossWeight * 1000, 2)}g</span>

                      <ErrorMessage
                          name={`sections[${index}].parentPercent`}
                          render={msg => <div className={classes.errorSection}>{msg}</div>}
                      />
                  </Grid>
              }
          </Grid>
      </Grid>
      <Grid container item xs={3} className={classes.natBorder} alignContent="center">
          <Grid item xs={4} className={`${classes.alignRight} ${classes.natCell}`}>
              { fromGenericSections && "--" }
              {
                  !fromGenericSections && (isHover
                      ? (
                          <>
                              <Field
                                  type="number"
                                  name={`sections[${index}].grossWeight`}
                                  value={ section.grossWeight ? section.grossWeight : getSectionGrossWeight(section) }
                                  onChange={e => _onGrossWeightChange(index, e)}
                                  onClick={_stopPropagation}
                                  className={classes.alignRight}
                                  onFocus={onFieldFocus}
                                  onBlur={onFieldBlur}
                                  onKeyUp={onKeyUp}
                                  onKeyDown={(e) => _onKeyDown(e, section, true)}
                                  onWheel= {(e) => e.target.blur()}
                              />
                              <ErrorMessage
                                  name={`sections[${index}].grossWeight`}
                                  render={msg => <div className={classes.error}>{msg}</div>}
                              />
                          </>
                      ) : (
                          error
                              ? (
                                  <ErrorMessage
                                      name={`sections[${index}].grossWeight`}
                                      render={msg => <div className={classes.error}>{msg}</div>}
                                  />
                              )
                              : (
                                  <div>
                                      { section.grossWeight ? section.grossWeight : getSectionGrossWeight(section) }
                                  </div>
                              )
                      )
                  )
              }
          </Grid>
          <Grid item xs={4} className={`${classes.alignRight} ${classes.natCell}`}>--</Grid>
          <Grid item xs={4} className={
              `${classes.alignRight} ${classes.natCell} ${classes.pricePadding} ${classes.bold}`
          }>
              {section.cost && `${roundNumber(section.cost, 3)}€`}
          </Grid>
      </Grid>
      <Grid container item xs={4} className={classes.natBorder} alignContent="center">
          <Grid item xs={4} className={
              `${classes.alignLeft} ${classes.natCell} ${classes.cookingModePadding}`
          }>
              --
          </Grid>
          <Grid item xs={4} className={`${classes.alignRight} ${classes.natCell}`}>--</Grid>
          <Grid item xs={3} className={`${classes.alignRight} ${classes.natCell} ${classes.bold}`}>
              {section.netWeight}
          </Grid>
          <Grid item xs={1} className={`${classes.alignRight} ${classes.natCell}`}>
              {
                  isHover &&
                  <DeleteIcon
                      className={error || isDeleteHover ? classes.deleteIconRed : classes.deleteIcon}
                      onClick={(e) => _removeSection(index, e) }
                      onMouseEnter={() => onDeleteHover(COMPONENT_NAME, index)}
                      onMouseLeave={onDeleteBlur}
                  />
              }
          </Grid>
      </Grid>
  </Grid>
)