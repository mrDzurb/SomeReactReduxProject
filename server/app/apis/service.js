require('module-alias/register');
const { MaterialGroupsModel, CalculationsModel } = require('@server/app/setup');

const pageApi = require('@apis/page');

/**
 * GEt material price info
 * If is setted orderNumber, then should get fact price info
 * If is setted materialFullKey, then should get plan price info
 *
 * @namespace apis.service
 * @method getMaterialPriceInfo
 * @param {String} orderNumber - number of order
 * * @param {String} materialFullKey - full key of material
 * @return {Object} result information about plan and fact material price
 */
module.exports.getMaterialPriceInfo = async (orderNumber, materialFullKey) => {
  // prepare result object
  const result = {
    info: null,
    plan: {
      coef_si_div_iu: 0,
      price: 0,
      date: '',
      account: '',
      good_code_1c: ''
    },
    fact:  {
      coef_si_div_iu: 0,
      price: 0,
      date: '',
      account: '',
      good_code_1c: ''
    }
  };

  // get material information by his code
  const materialKeySrc = materialFullKey.split('.');
  const groupKey = parseInt(materialKeySrc[0], 10);
  const materialKey = parseInt(materialKeySrc[1], 10);
  const propKey = (materialKeySrc.length > 2) ? parseInt(materialKeySrc[2], 10) : null;

  const dataMaterialGroup = await MaterialGroupsModel
    .findOne({
      code: groupKey,
      'materials.code': materialKey
    })
    .select({ 'materials.$':1 });

  if (dataMaterialGroup === null) {
    throw new Error(`Материал ${ materialFullKey } не найден`);
  }

  const dataMaterial = dataMaterialGroup.materials[0];
  result.info = {
    _id: dataMaterial._id,
    name: dataMaterial.name,
    full_code: materialFullKey
  };

  if (propKey !== null && dataMaterial.unique_props !== null) {
    const propInfo = dataMaterial.unique_props.find(x => x.key === propKey);
    if (propInfo) {
      result.plan = propInfo.last_goods;
    } else {
      throw new Error(`Указанный материал ${ materialFullKey } не содержит характеристику с кодом: ${ propKey }`);
    }
  } else {
    result.plan = dataMaterial.last_goods;
  }

  if (orderNumber) {
    const orderNumberSrc = orderNumber.split('.');
    if (orderNumberSrc.length < 3) {
      throw new Error('Неверный номер заказа');
    }

    const specificationInfo = await CalculationsModel
      .findOne({
        order_number: `${ orderNumberSrc[0] }.${ orderNumberSrc[1] }`,
        'materials.materials_group_key': groupKey,
        'materials.materials_key': materialKey
      })
      .select({ 'materials.$':1 });

    if (specificationInfo === null) {
      throw new Error('Cпецификация не найдена или не содержит указанный материал');
    }

    const unitNumber = orderNumberSrc[2];
    const tmpSearchMaterialKey = `${ groupKey }_${ materialKey }`;

    let key = '';
    for (const row of specificationInfo.materials) {
      key = `${ row.materials_group_key }_${ row.materials_key }`;
      if (key === tmpSearchMaterialKey && row.facts && row.facts[unitNumber]) {
        const factsObj = row.facts[unitNumber];
        result.fact = {
          coef_si_div_iu: factsObj.coef_si_div_iu ? factsObj.coef_si_div_iu : 0,
          price: factsObj.price ? factsObj.price : 0,
          date: factsObj.date ? factsObj.date : '',
          account: factsObj.account ? factsObj.account : '',
          good_code_1c: factsObj.good_code_1c ? factsObj.good_code_1c : ''
        };
        break;
      }
    }
  }

  return result;
};
