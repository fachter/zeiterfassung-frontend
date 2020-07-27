<template>
  <div>
    <span class="warning" v-if="configs.kunden.length > 0">Achtung: Wenn Sie einen Kunden löschen, werden automatisch alle dazugehörigen Zeiten unwiederruflich gelöscht.</span><br>
    <label class="mt-2">
      <input class="mr-2" type="text" v-model="kundeToAdd">
    </label>
    <button class="btn-sm btn-outline-success" @click="addKunde()">Hinzufügen</button>
    <div class="m-2 " v-for="k in configs.kunden" :key="k.kundenName">
      <div v-if="!k.deleted" class="row">
        <span style="font-weight: bold; font-size: larger" class="col-16">
          {{ k.kundenName }}
        </span>
        <div class="col-8">
          <button class="btn-sm btn-danger" @click="removeKunde(k)">
            X
          </button>
        </div>
      </div>
      <div v-else class="row">
        <span class="col-16"></span>
        <button class="btn-sm btn-outline-success" @click="restoreKunde(k)">Wiederherstellen</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ApplicationState from "../../state/ApplicationState";
  import KundenViewModel from "@/components/view-models/configs/KundenViewModel";
  import AxiosCaller from "@/components/utils/AxiosCaller";
  import Synchronizer from "@/components/utils/Synchronizer";

  @Component
  export default class KundenConfig extends Vue {
    private configs = ApplicationState.data.configs;
    private kundeToAdd = "";
    private axiosCaller = new AxiosCaller();
    private synchronizer = new Synchronizer();

    removeKunde(k: KundenViewModel): void {
      for (let i = 0; i < this.configs.kunden.length; i++) {
        if (this.configs.kunden[i] === k) {
          k.deleted = true;
          return;
        }
      }
    }

    restoreKunde(k: KundenViewModel): void {
      for (let i = 0; i < this.configs.kunden.length; i++) {
        if (this.configs.kunden[i] === k) {
          k.deleted = false;
          return;
        }
      }
    }

    addKunde(): void {
      if (this.kundeToAdd !== "") {
        if (this.nameAlreadyExists()) {
          alert("Ein Kunde mit diesem Namen existiert bereits");
        } else {
          const newKunde = new KundenViewModel(this.kundeToAdd);
          this.configs.kunden.push(newKunde)
          this.kundeToAdd = "";
        }
      } else {
        alert("Das Feld darf nicht leer sein");
      }
    }

    private nameAlreadyExists(): boolean {
      for (const persistedKunde of this.configs.kunden)
        if (persistedKunde.kundenName === this.kundeToAdd)
          return true;

      return false;
    }

    beforeDestroy() {
      if (this.configs.kunden.length > 0) {
        const kunden = this.configs.kunden;
        this.axiosCaller.postRequest("/add-kunden", kunden)
          .then(() => this.synchronizer.fetchKundenForUser())
          .catch((err) => {
            console.log(err.response);
            alert("Es gab ein Problem mit dem Speichern der Kunden");
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