<?php

namespace App\Days\Day08;


class Part2 extends Part1
{


    public function solve(): string
    {
        $this->parseInput();
        $this->tree = $this->parseNodeTree($this->entries, 1)['nodes'];
        return $this->getNodeValue($this->tree[0]);
    }


    private function getNodeValue($node): int
    {
        if ($node['childNodesNumber'] === 0) {
            return array_reduce($node['metadataEntries'], function (int $sum, int $entry) {
                return $sum + $entry;
            }, 0);
        }
        return array_reduce($node['metadataEntries'], function (int $sum, int $entry) use ($node) {
            $childIndex = $entry - 1;
            $referencedChild = $node['childNodes'][$childIndex];
            if (is_null($referencedChild)) {
                return $sum + 0;
            };
            return $sum + $this->getNodeValue($referencedChild);
        }, 0);
    }

}




