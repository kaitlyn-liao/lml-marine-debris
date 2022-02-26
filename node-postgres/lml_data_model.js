const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lml_user',
  host: 'localhost',
  database: 'lml_database',
  password: 'wave',
  port: 5432,
});

// TODO: 
const getDebrisData = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM lml_debris_data ORDER BY entry_id ASC', (error, results) => {
      if (error) {
        console.log("cannot get debris data");
        reject(error)
      }
      if(results){
        resolve(results.rows);
      }
    })
  }) 
}

// TODO: change pool.query to fit correct headers
const createDebrisData = (body) => {
  return new Promise(function(resolve, reject) {
    const {
      beach, mentor, type, season, mmddyy, 
      mesoFragPlastic, macroFragPlastic, totalFragPlastic,
      mesoPlasticProducts, macroPlasticProducts, totalPlasticProducts,
      mesoFoodWrap, macroFoodWrap, totalFoodWrap,
      mesoStyro, macroStyro, totalStyro,
      mesoCigButts, macroCigButts, totalCigButts,
      mesoPaper, macroPaper, totalPaper,
      mesoMetal, macroMetal, totalMetal,
      mesoGlass, macroGlass, totalGlass,
      mesoFabric, macroFabric, toalFabric,
      mesoPellets, macroPellets, totalPellets, 
      mesoFishingGear, macroFishingGear, totalFishingGear,
      mesoRubber, macroRubber, totalRubber, 
      mesoOther, macroOther, totalOther,
      totalMesoDebris, totalMacroDebris, totalTotalDebris,
      mesoDebrisDivMsq, macroDebrisDivMsq, totalDebrisDivMsq,
      notes
    } = body

    pool.query('INSERT INTO lml_debris_data'+
                ' ('+
                ' beach, mentor, type, season, date,' +
                ' meso_fragmented_plastic, macro_fragmented_plastic, total_fragmented_plastic,'+
                ' meso_plastic_products, macro_plastic_products, total_plastic_products,'+
                ' meso_food_wrappers, macro_food_wrappers, total_food_wrappers,'+
                ' meso_styrofoam, macro_styrofoam, total_styrofoam,'+
                ' meso_cigarette_butts, macro_cigarette_butts, total_cigarette_butts,'+
                ' meso_paper_and_treated_wood, macro_paper_and_treated_wood, total_paper_and_treated_wood,'+
                ' meso_metal, macro_metal, total_metal,'+
                ' meso_glass, macro_glass, total_glass,'+
                ' meso_fabric, macro_fabric, total_fabric,'+
                ' meso_fetilizer_pellets, macro_fetilizer_pellets, total_fetilizer_pellets,'+
                ' meso_fishing_gear, macro_fishing_gear, total_fishing_gear,'+
                ' meso_rubber, macro_rubber, total_rubber,'+
                ' meso_other, macro_other, total_other,'+
                ' total_meso_debris, total_macro_debris, total_debris,'+
                ' meso_debris_divby_m_sq, macro_debris_divby_m_sq, total_debris_divby_m_sq,'+
                ' notes'+
                ')' +

                ' VALUES ('+
                ' $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,' +
                ' $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,' +
                ' $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,'+
                ' $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,'+
                ' $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51'+
                ' ) RETURNING * ', 
                
                [ beach, mentor, type, season, mmddyy, 
                  mesoFragPlastic, macroFragPlastic, totalFragPlastic,
                  mesoPlasticProducts, macroPlasticProducts, totalPlasticProducts,
                  mesoFoodWrap, macroFoodWrap, totalFoodWrap,
                  mesoStyro, macroStyro, totalStyro,
                  mesoCigButts, macroCigButts, totalCigButts,
                  mesoPaper, macroPaper, totalPaper,
                  mesoMetal, macroMetal, totalMetal,
                  mesoGlass, macroGlass, totalGlass,
                  mesoFabric, macroFabric, toalFabric,
                  mesoPellets, macroPellets, totalPellets, 
                  mesoFishingGear, macroFishingGear, totalFishingGear,
                  mesoRubber, macroRubber, totalRubber, 
                  mesoOther, macroOther, totalOther,
                  totalMesoDebris, totalMacroDebris, totalTotalDebris,
                  mesoDebrisDivMsq, macroDebrisDivMsq, totalDebrisDivMsq,
                  notes
                ], (error, results) => {
      if (error) {
        reject(error)
      }
      if(results){
        resolve(`A new lml entry has been added added: ${results.rows[0]}`)
      }
    })
  })
}

// TODO: 
const deleteDebrisData = (DebrisDataId) => {
  return new Promise(function(resolve, reject) {
    const entry_id = parseInt(DebrisDataId)
    pool.query('DELETE FROM lml_debris_data WHERE entry_id = $1', [entry_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Debris Data deleted with ID: ${entry_id}`)
    })
  })
}

const clearDebrisData = () => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM lml_debris_data', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Debris Data emptied`);
    })
  })
}

module.exports = {
     getDebrisData,
  createDebrisData,
  deleteDebrisData,
  clearDebrisData,
}