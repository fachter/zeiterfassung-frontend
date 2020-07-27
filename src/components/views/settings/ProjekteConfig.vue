<template>
  <div>
    <span class="warning" v-if="configs.projekte.length > 0">Achtung: Wenn Sie ein Projekt löschen, werden automatisch alle dazugehörigen Zeiten unwiederruflich gelöscht.</span><br>
    <label class="mt-2">
      <input class="mr-2" type="text" v-model="projektToAdd">
    </label>
    <button class="btn-sm btn-outline-success" @click="addProjekt()">Hinzufügen</button>
    <div class="m-2 " v-for="p in configs.projekte" :key="p.projektName">
      <div class="row" v-if="!p.deleted">
        <span style="font-weight: bold; font-size: larger" class="col-16">
          {{ p.projektName }}
        </span>
        <div class="col-8">
          <button class="btn-sm btn-danger" @click="removeProjekt(p)">
            X
          </button>
        </div>
      </div>
      <div v-else class="row">
        <span class="col-16"></span>
        <button class="btn-sm btn-outline-success" @click="restoreProjekt(p)">Wiederherstellen</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ApplicationState from "../../state/ApplicationState";
  import ProjektViewModel from "@/components/view-models/configs/ProjektViewModel";
  import AxiosCaller from "@/components/utils/AxiosCaller";
  import Synchronizer from "@/components/utils/Synchronizer";

  @Component
  export default class ProjekteConfig extends Vue {
    private projektToAdd = "";
    private configs = ApplicationState.data.configs;
    private axiosCaller = new AxiosCaller();
    private synchronizer = new Synchronizer();

    removeProjekt(p: ProjektViewModel): void {
      for (let i = 0; i < this.configs.projekte.length; i++) {
        if (this.configs.projekte[i] === p) {
          p.deleted = true;
          return;
        }
      }
    }

    restoreProjekt(p: ProjektViewModel): void {
      for (let i = 0; i < this.configs.projekte.length; i++) {
        if (this.configs.projekte[i] === p) {
          p.deleted = false;
          return;
        }
      }
    }

    addProjekt(): void {
      if (this.projektToAdd !== "") {
        if (this.nameAlreadyExists()) {
          alert("Ein Kunde mit diesem Namen existiert bereits");
        } else {
          const newProjekt = new ProjektViewModel(this.projektToAdd);
          this.configs.projekte.push(newProjekt)
          this.projektToAdd = "";
        }
      } else {
        alert("Das Feld darf nicht leer sein");
      }
    }

    private nameAlreadyExists(): boolean {
      for (const persistedProjekt of this.configs.projekte)
        if (persistedProjekt.projektName === this.projektToAdd)
          return true;

      return false;
    }

    beforeDestroy() {
      if (this.configs.projekte.length > 0) {
        const projekte = this.configs.projekte;
        this.axiosCaller.postRequest("/add-projekte", projekte)
          .then(() => this.synchronizer.fetchProjekteForUser())
          .catch((err) => {
            console.log(err.response);
            alert("Es gab ein Problem mit dem Speichern der Projekte");
          })
      }
    }

  }
</script>

<style scoped>
  .warning {
    color: red;
  }
</style>