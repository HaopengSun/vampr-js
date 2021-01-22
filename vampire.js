class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const currentVampire = this;
    if (currentVampire.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      return false;
    }
    return true;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const equal = function(old, young){
      while(young.numberOfVampiresFromOriginal !== old.numberOfVampiresFromOriginal) {
        young = young.creator;
      }
      return result(old, young);
    }

    const result = function(vampire1, vampire2){
      if (vampire1.name === vampire2.name) {
        return vampire1;
      } else {
        do {
          vampire1 = vampire1.creator;
          vampire2 = vampire2.creator;
        } while (vampire1.name !== vampire2.name);
        return vampire1;
      }
    }

    const currentVampire = this;

    if (currentVampire.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      return equal(vampire, currentVampire);
    } else if (currentVampire.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return equal(currentVampire, vampire);
    } else {
      return result(currentVampire, vampire);
    }
  }
}

module.exports = Vampire;
